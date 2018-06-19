import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import neo4j from 'neo4j';
import localConfig from '../config';
import isAuthenticated from '../middlewares/auth';

const router = express.Router();

const db = new neo4j.GraphDatabase('http://neo4j:1111@localhost:7474');

router.get('/:user_email', isAuthenticated, (req, res) => {
  const userEmail = req.params.user_email;
  const query = [
    'MATCH (b:Person)-[l]->(r:Record), (b)-[s:SIMILARITY]-(a:Person {email: {userEmail}})',
    'WHERE NOT((a)-[:LIKE]->(r))',
    'WITH r, s.similarity AS similarity, l.weight AS weight',
    'ORDER BY r.title, similarity DESC',
    'WITH r.title AS record, COLLECT(weight)[0..3] AS weight',
    'WITH record, REDUCE(s = 0, i IN weight | s + i)*1.0 / SIZE(weight) AS reco',
    'ORDER BY reco DESC',
    'RETURN record AS Record, reco AS Recommendation',
  ];
  const params = {
    userEmail,
  };

  return db.cypher({ query: query.reduce((a, b) => `${a} ${b}`), params }, (err, results) => {
    if (err) {
      res.json({
        success: false,
      });
      return;
    }

    res.json({
      success: true,
      result: results,
    });
  });
});

module.exports = router;

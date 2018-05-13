import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import neo4j from 'neo4j';
import localConfig from '../config';
import isAuthenticated from '../middlewares/auth';

const router = express.Router();

const db = new neo4j.GraphDatabase('http://neo4j:1111@localhost:7474');

const getRelLabel = type => (
  type === 'LIKE'
    ? '[l:LIKE { weight: 5 }]'
    : '[l:VIEW { weight: 1 }]'
);

router.post('/', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({
      success: false,
    });
  }

  const query = 'CREATE (ee:Record { id: {id} })';
  const params = {
    id,
  };

  return db.cypher({ query, params }, (err, results) => {
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

router.route('/:record_id', isAuthenticated)

  .get((req, res) => {
    const query = 'MATCH (p:Record { id: {id} }) RETURN p';
    const params = { id: req.params.record_id };

    return db.cypher({ query, params }, (err, results) => {
      if (err) {
        res.json({
          success: false,
        });
        return;
      }

      res.json({
        success: true,
        result: results[0] ? results[0].p.properties : {},
      });
    });
  })

  .delete((req, res) => {
    const query = 'MATCH (p:Record { id: {id} }) DELETE p';
    const params = { email: req.params.record_id };

    return db.cypher({ query, params }, (err, results) => {
      if (err) {
        res.json({
          success: false,
        });
        return;
      }

      res.json({
        success: true,
        result: results[0] ? results[0].p.properties : {},
      });
    });
  })

  .put((req, res) => {
    const query = 'MATCH (p:Record { id: {id} }) SET p.id ={newId}';
    const params = { id: req.params.record_id, newId: req.body.newId };

    return db.cypher({ query, params }, (err, results) => {
      if (err) {
        res.json({
          success: false,
        });
        return;
      }

      res.json({
        success: true,
        result: results[0] ? results[0].p.properties : {},
      });
    });
  });

module.exports = router;

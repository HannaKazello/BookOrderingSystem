import express from 'express';
import neo4j from 'neo4j';
import isAuthenticated from '../middlewares/auth';

const router = express.Router();

const db = new neo4j.GraphDatabase('http://neo4j:1111@localhost:7474');

const getRelLabel = type => (
  type === 'LIKE'
    ? '[l:LIKE { weight: 5 }]'
    : '[l:VIEW { weight: 1 }]'
);

router.post('/', isAuthenticated, (req, res) => {
  const { userEmail, recordId, type } = req.body;
  if (!userEmail || !recordId || type) {
    return res.json({
      success: false,
    });
  }

  const query = `MATCH (p:Person { email: {userEmail}}), (r:Record { id: {recordId}}) CREATE (p)-${getRelLabel(type)}->(r)`;
  const params = {
    userEmail, recordId, type,
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

router.delete('/', isAuthenticated, (req, res) => {
  const { userEmail, recordId, type } = req.body;
  if (!userEmail || !recordId || type) {
    return res.json({
      success: false,
    });
  }

  const query = `MATCH (p:Person { email: {userEmail}})-${getRelLabel(type)}->(r:Record { id: {recordId}}) DELETE l`;
  const params = {
    userEmail, recordId, type,
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

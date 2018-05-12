import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import neo4j from 'neo4j';
import localConfig from '../config';
import isAuthenticated from '../middlewares/auth';

const router = express.Router();

const db = new neo4j.GraphDatabase('http://neo4j:1111@localhost:7474');

const encryptPassword = password =>
  crypto.createHmac('sha1', localConfig.secret).update(password).digest('hex');

router.post('/authenticate', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: 'Authentication failed. User or password are not provided',
    });
  }

  const query = 'MATCH (p:Person { email: {email} }) RETURN p';
  const params = { email };

  return db.cypher({ query, params }, (err, results) => {
    if (err) {
      res.json({
        success: false,
        message: err.message,
      });
      return;
    }

    const result = results[0];
    if (!result) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.',
      });
      return;
    }

    const user = result.p.properties;

    if (encryptPassword(password) !== user.password) {
      res.json({
        success: false,
        message: 'Authentication failed. Wrong password.',
      });
      return;
    }

    const token = jwt.sign(user, localConfig.secret);

    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  });
});

router.post('/', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
    });
  }

  const hashedPassword = encryptPassword(password);
  const query = 'CREATE (ee:Person { name: {name}, email: {email}, password: {password} })';
  const params = {
    email, password: hashedPassword, name,
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

router.get('/', isAuthenticated, (req, res) => {
  const query = 'MATCH (p:Person) RETURN p';
  const mapToUsers = array => array.map(el => el.p.properties);

  return db.cypher({ query }, (err, results) => {
    if (err) {
      res.json({
        success: false,
      });
      return;
    }

    res.json({
      success: true,
      result: mapToUsers(results),
    });
  });
});

router.route('/:user_email', isAuthenticated)

  .get((req, res) => {
    const query = 'MATCH (p:Person { email: {email} }) RETURN p';
    const params = { email: req.params.user_email };

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
    const query = 'MATCH (p:Person { email: {email} }) DELETE p';
    const params = { email: req.params.user_email };

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
    const query = 'MATCH (p:Person { email: {email} }) SET p.name ={newName}';
    const params = { email: req.params.user_email, newName: req.body.newName };

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

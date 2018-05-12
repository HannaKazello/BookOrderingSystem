import jwt from 'jsonwebtoken';
import localConfig from '../config';

const isAuthenticated = (req, res, next) => {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    // if there is no token
    // return an error
    res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
    return;
  }
  // verifies secret and checks exp
  jwt.verify(token, localConfig.secret, (err, decoded) => {
    if (err) {
      res.json({
        success: false,
        message: 'Failed to authenticate token.',
      });
      return;
    }

    // if everything is good, save to request for use in other routes
    req.decoded = decoded;
    next();
  });
};

export default isAuthenticated;

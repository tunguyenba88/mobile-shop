const admin = require('../firebase/index');

const authCheck = async (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];

  if (token !== 'undefined') {
    try {
      const firebaseUser = await admin.auth().verifyIdToken(token);
      req.user = firebaseUser;
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).json({
        message: 'Invalid or expired token, please logout and login again!',
      });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { authCheck };

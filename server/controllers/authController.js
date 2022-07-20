const { User } = require('../model/userModel');

exports.currentUser = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({
      message: 'No user found',
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });

  if (user.role !== 'admin') {
    res.status(403).json({
      message: 'Admin resource. Access denied',
    });
  } else {
    next();
  }
};

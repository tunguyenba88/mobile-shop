const express = require('express');
const {
  createOrUpdateUser,
  currentUser,
  adminCheck,
} = require('../controllers/authController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;

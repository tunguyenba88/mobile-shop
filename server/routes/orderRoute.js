const express = require('express');
const { adminCheck } = require('../controllers/authController');
const {
  listOrder,
  updateOrderStatus,
  getOrder,
} = require('../controllers/orderController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.get('/list', authCheck, adminCheck, listOrder);
router.get('/:orderId', authCheck, adminCheck, getOrder);
router.put('/update-status', authCheck, adminCheck, updateOrderStatus);

module.exports = router;

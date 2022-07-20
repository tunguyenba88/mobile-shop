const express = require('express');
const {
  saveCart,
  getUserCart,
  capNhatThongTinNguoiMuaHang,
  applyCoupon,
} = require('../controllers/cartController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/save', authCheck, saveCart);

router.get('/get-user-cart', authCheck, getUserCart);
router.put('/update-user-info', authCheck, capNhatThongTinNguoiMuaHang);
router.put('/apply-coupon', authCheck, applyCoupon);

module.exports = router;

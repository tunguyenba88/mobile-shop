const express = require('express');
const {
  createOrUpdateUser,
  createOrderWithPayment,
  getUserOrders,
  createCodOrder,
  listWishlist,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/userController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/create-order-with-payment', authCheck, createOrderWithPayment);
router.post('/create-cod-order', authCheck, createCodOrder);
router.get('/orders', authCheck, getUserOrders);
router.get('/wishlist', authCheck, listWishlist);
router.post('/wishlist', authCheck, addToWishlist);
router.put('/wishlist/:productId', authCheck, removeFromWishlist);

module.exports = router;

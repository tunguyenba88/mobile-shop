const express = require('express');
const { createPaymentIntent } = require('../controllers/stripeController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-payment-intent', authCheck, createPaymentIntent);

module.exports = router;

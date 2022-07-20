const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { User } = require('../model/userModel');
const { Cart } = require('../model/cartModel');

exports.createPaymentIntent = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const { totalAfterDiscount } = await Cart.findOne({
      orderedBy: user._id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.ceil(((totalAfterDiscount / 22839) * 100).toFixed(2)),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
      totalAfterDiscount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

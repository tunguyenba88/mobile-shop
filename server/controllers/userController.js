const { Cart } = require('../model/cartModel');
const { Order } = require('../model/orderModel');
const { Product } = require('../model/productModel');
const { User } = require('../model/userModel');
const { v4: uuidv4 } = require('uuid');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { avatar: picture },
    { new: true }
  );
  if (user) {
    res.json(user);
  } else {
    const newUser = await User.create({ email, name, avatar: picture });
    res.json(newUser);
  }
};

module.exports.createOrderWithPayment = async (req, res) => {
  try {
    const { paymentIntent } = req.body;
    const user = await User.findOne({ email: req.user.email });
    let { products } = await Cart.findOne({ orderedBy: user._id });
    let newOrder = await new Order({
      products,
      paymentIntent,
      orderedBy: user._id,
    }).save();

    // update left quantity , sold quantity for product
    let bulkOptions = products.map((p) => {
      return {
        updateOne: {
          filter: { _id: p.product._id },
          update: { $inc: { quantity: -p.count, sold: +p.count } },
        },
      };
    });

    await Product.bulkWrite(bulkOptions);

    res.json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.createCodOrder = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    console.log(user);
    let { products, total } = await Cart.findOne({ orderedBy: user._id });
    console.log(products);
    let newOrder = await new Order({
      products,
      paymentIntent: {
        id: uuidv4(),
        amount: total,
        currency: 'vnd',
        created: Math.floor(Date.now() / 1000),
        payment_method_types: ['cash'],
        status: 'Ship COD',
      },
      orderedBy: user._id,
    }).save();
    // update left quantity , sold quantity for product
    let bulkOptions = products.map((p) => {
      return {
        updateOne: {
          filter: { _id: p.product._id },
          update: { $inc: { quantity: -p.count, sold: +p.count } },
        },
      };
    });

    await Product.bulkWrite(bulkOptions);
    res.json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getUserOrders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const userOrders = await Order.find({ orderedBy: user._id })
      .populate('products.product')
      .sort([['createdAt', 'desc']]);
    res.json(userOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.listWishlist = async (req, res) => {
  const wishlist = await User.findOne({ email: req.user.email })
    .select('wishlist')
    .populate('wishlist');

  res.json(wishlist);
};
module.exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: productId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        $pull: { wishlist: req.params.productId },
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

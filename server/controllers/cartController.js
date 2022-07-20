const { Cart } = require('../model/cartModel');
const { Coupon } = require('../model/couponModel');
const { User } = require('../model/userModel');
const { Order } = require('../model/orderModel');
const { Product } = require('../model/productModel');

exports.saveCart = async (req, res) => {
  try {
    const { cart, sl, total } = req.body;

    const user = await User.findOne({ email: req.user.email });

    let products = [];

    const oldCart = await Cart.find({ orderedBy: user._id });
    console.log(oldCart);

    if (oldCart.length !== 0) {
      oldCart.map((c) => c.remove());
      // if (cart.length === 0) {
      //   return;
      // }
    }

    for (let i = 0; i < cart.length; i++) {
      let cartItem = cart[i];
      let object = {};
      object.product = cartItem._id;
      object.count = cartItem.count;
      products.push(object);
    }

    const newCart = await new Cart({
      products,
      total,
      sl,
      totalAfterDiscount: total,
      orderedBy: user._id,
    }).save();

    res.json(newCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    let cart = await Cart.findOne({ orderedBy: user._id }).populate(
      'products.product'
    );
    if (!cart) {
      throw new Error('No user cart');
    } else {
      return res.json(cart);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.capNhatThongTinNguoiMuaHang = async (req, res) => {
  try {
    const { name, sdt, address } = req.body;
    const newUser = await User.findOneAndUpdate(
      { email: req.user.email },
      { name, sdt, address },
      { new: true }
    );
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { coupon } = req.body;
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (!validCoupon) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy mã giảm giá này' });
    }
    const user = await User.findOne({ email: req.user.email });
    let { total } = await Cart.findOne({ orderedBy: user._id });
    let totalAfterDiscount = (
      total -
      (total * validCoupon.discount) / 100
    ).toFixed(2);

    await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount },
      { new: true }
    );
    res.json({ totalAfterDiscount, discount: validCoupon.discount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const { Coupon } = require('../model/couponModel');

exports.create = async (req, res) => {
  try {
    const { name, expireIn, discount } = req.body;
    return res.json(await new Coupon({ name, expireIn, discount }).save());
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndRemove(req.params.couponId);
    res.json(deletedCoupon);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }));
  } catch (error) {
    console.log(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { name, expireIn, discount } = req.body;
    console.log(req.body);
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.couponId,
      {
        name,
        expireIn,
        discount,
      },
      { new: true }
    );
    res.json(updatedCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const { Order } = require('../model/orderModel');

module.exports.listOrder = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort('-createdAt')
      .populate('products.product')
      .populate('orderedBy');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    const updated = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getOrder = async (req, res) => {
  console.log(req.params.orderId);

  try {
    const order = await Order.find({ _id: req.params.orderId })
      .populate('products.product')
      .sort([['createdAt', 'desc']]);
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

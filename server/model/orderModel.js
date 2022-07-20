const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    products: [{ product: { type: ObjectId, ref: 'Product' }, count: Number }],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'Not process',
      enum: ['Not process', 'Processing', 'Dispatch', 'Cancelled', 'Completed'],
    },
    orderedBy: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports.Order = mongoose.model('Order', orderSchema);

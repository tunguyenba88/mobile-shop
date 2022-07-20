const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
  {
    products: [{ product: { type: ObjectId, ref: 'Product' }, count: Number }],
    total: Number,
    sl: Number,
    totalAfterDiscount: Number,
    orderedBy: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports.Cart = mongoose.model('Cart', cartSchema);

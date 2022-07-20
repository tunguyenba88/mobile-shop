const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    cart: {
      type: Array,
      default: [],
    },
    avatar: { type: String },
    address: String,
    sdt: String,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

module.exports.User = mongoose.model('User', userSchema);

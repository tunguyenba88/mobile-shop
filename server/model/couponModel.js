const mongoose = require('mongoose');

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: true,
      minLength: [6, 'Too short'],
      maxLength: [12, 'Too long'],
    },
    discount: {
      type: Number,
      required: true,
    },
    expireIn: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

exports.Coupon = mongoose.model('Coupon', couponSchema);

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports.Comment = mongoose.model('Comment', commentSchema);

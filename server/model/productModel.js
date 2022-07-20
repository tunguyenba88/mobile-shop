const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    sub: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
    quantity: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    images: { type: Array },
    shipping: { type: String, enum: ['Yes', 'No'] },
    color: {
      type: String,
      enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    },
    brand: {
      type: String,
      enum: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
);

module.exports.Product = mongoose.model('Product', productSchema);

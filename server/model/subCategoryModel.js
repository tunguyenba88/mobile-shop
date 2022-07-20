const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: 'Name is required',
      minlength: [3, 'Too short'],
      maxLength: [32, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.SubCategory = mongoose.model('SubCategory', subCategorySchema);

const slugify = require('slugify');
const { SubCategory } = require('../model/subCategoryModel');
const { Category } = require('../model/categoryModel');
const { Product } = require('../model/productModel');

const checkDuplicateError = (data, res) => {
  if (data.length !== 0) {
    return res.status(400).json({ message: 'Tên danh mục con đã tồn tại' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const sub = await SubCategory.find({ slug: slugify(name) });
    if (sub.length !== 0) {
      return res.status(400).json({ message: 'Tên danh mục con đã tồn tại' });
    }
    const newSub = await SubCategory.create({
      name,
      slug: slugify(name),
      parent,
    });
    res.json(newSub);
  } catch (error) {
    res.status(400).json({
      message: 'Create sub category failed',
    });
  }
};
exports.list = async (req, res) => {
  const subCategories = await SubCategory.find({})
    .populate('parent')
    .sort({ createdAt: -1 });

  res.json(subCategories);
};
exports.getOne = async (req, res) => {
  const sub = await SubCategory.findOne({ slug: req.params.slug }).populate(
    'parent'
  );
  if (!sub) {
    res.status(403).json({
      message: 'No sub category found',
    });
  } else {
    res.json(sub);
  }
};
exports.update = async (req, res) => {
  console.log(req.body);
  const newCategory = await Category.findOne({
    slug: req.body.newCategorySlug,
  });
  const oldCategory = await Category.findOne({ slug: req.body.oldParent });
  try {
    const updateSub = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name: req.body.name,
        slug: slugify(req.body.name),
        parent: newCategory._id,
      },
      { new: true }
    );
    await Product.updateMany(
      { category: oldCategory._id },
      { category: newCategory._id }
    );

    res.json(updateSub);
  } catch (error) {
    res.status(400).json({ message: 'Trùng tên danh mục con' });
  }
};
exports.remove = async (req, res) => {
  const sub = await SubCategory.findOneAndDelete({
    slug: req.params.slug,
  });
  if (sub) {
    res.json({ message: 'Sub category removed' });
  } else {
    res.status(404).json({ message: 'Sub category not found' });
  }
};

exports.getSubsByCategoryId = async (req, res) => {
  try {
    const subs = await SubCategory.find({ parent: req.params.parentId });
    res.json(subs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

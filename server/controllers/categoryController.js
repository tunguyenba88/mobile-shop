const { Category } = require('../model/categoryModel');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.find({ slug: slugify(name) });
    if (category.length !== 0) {
      return res.status(400).json({ message: 'Tên danh mục đã tồn tại' });
    }
    const newCategory = await Category.create({ name, slug: slugify(name) });
    res.json(newCategory);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: 'Create category failed',
    });
  }
};
exports.list = async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 });

  res.json(categories);
};
exports.getOne = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  console.log(category);
  if (!category) {
    res.status(404).json({
      message: 'No category found',
    });
  } else {
    res.json(category);
  }
};
exports.update = async (req, res) => {
  const category = await Category.find({ name: req.body.name });
  if (category.length !== 0) {
    return res.status(400).json({ message: 'Tên danh mục đã tồn tại' });
  }
  const updateCategory = await Category.findOneAndUpdate(
    { slug: req.params.slug },
    { name: req.body.name, slug: slugify(req.body.name) },
    { new: true }
  );
  if (updateCategory) {
    res.json(updateCategory);
  } else {
    res.status(404).json({ message: 'No category found' });
  }
};
exports.remove = async (req, res) => {
  const category = await Category.findOneAndDelete({ slug: req.params.slug });
  if (category) {
    res.json({ message: 'Category removed' });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
};

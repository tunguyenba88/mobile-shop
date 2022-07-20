const { Comment } = require('../model/commentModel');
const { Product } = require('../model/productModel');
const { User } = require('../model/userModel');

exports.listCmtByProductId = async (req, res) => {
  try {
    const product = await Product.find({ slug: req.params.productSlug });
    const comments = await Comment.find({ product: product[0]._id })
      .populate('user')
      .sort({
        createdAt: -1,
      });
    return res.json(comments);
  } catch (error) {
    console.log(error.message);
  }
};

exports.cmtProduct = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    console.log(user);
    console.log(req.params.productId);
    console.log(req.body.comment);

    const newComment = await Comment.create({
      user: user._id,
      product: req.params.productId,
      comment: req.body.comment,
    });
    return res.json(
      await Comment.find({ product: req.params.productId })
        .populate('user')
        .sort({ createdAt: -1 })
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};

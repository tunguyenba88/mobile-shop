const express = require('express');
const {
  cmtProduct,
  listCmtByProductId,
} = require('../controllers/commentController');

const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/:productId', authCheck, cmtProduct);
router.get('/:productSlug', listCmtByProductId);

module.exports = router;

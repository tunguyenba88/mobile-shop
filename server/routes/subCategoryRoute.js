const express = require('express');
const { adminCheck } = require('../controllers/authController');

const router = express.Router();

const {
  create,
  list,
  getOne,
  update,
  remove,
  getSubsByCategoryId,
} = require('../controllers/subCategoryController');
const { authCheck } = require('../middlewares/auth');

router.post('/', authCheck, adminCheck, create);
router.get('/', list);
router.get('/:slug', getOne);
router.put('/:slug', authCheck, adminCheck, update);
router.delete('/:slug', authCheck, adminCheck, remove);
router.get('/category/:parentId', getSubsByCategoryId);

module.exports = router;

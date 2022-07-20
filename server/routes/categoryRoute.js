const express = require('express');
const { adminCheck } = require('../controllers/authController');

const router = express.Router();

const {
  create,
  list,
  getOne,
  update,
  remove,
} = require('../controllers/categoryController');
const { authCheck } = require('../middlewares/auth');

router.post('/', authCheck, adminCheck, create);
router.get('/', list);
router.get('/:slug', getOne);
router.put('/:slug', authCheck, adminCheck, update);
router.delete('/:slug', authCheck, adminCheck, remove);

module.exports = router;

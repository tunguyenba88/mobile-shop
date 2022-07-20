const express = require('express');
const { adminCheck } = require('../controllers/authController');
const {
  list,
  create,
  remove,
  update,
} = require('../controllers/couponController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.get('/list', list);
router.post('/create', authCheck, adminCheck, create);
router.delete('/delete/:couponId', authCheck, adminCheck, remove);
router.put('/update/:couponId', authCheck, adminCheck, update);

module.exports = router;

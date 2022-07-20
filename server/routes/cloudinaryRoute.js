const express = require('express');
const { adminCheck } = require('../controllers/authController');
const { upload, remove } = require('../controllers/cloudinaryController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/upload-images', authCheck, adminCheck, upload);
router.post('/remove-image', authCheck, adminCheck, remove);

module.exports = router;

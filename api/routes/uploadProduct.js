const express = require('express');
const { uploadFile } = require('../controllers/uploadProduct');
const router = express.Router();

router.post('/', uploadFile);

module.exports = router;
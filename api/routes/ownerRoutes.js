
const express = require('express');
const { ownerSignUp,ownerSignIn } = require('../controllers/ownerController');
const router = express.Router();

router.post('/signup', ownerSignUp);
router.post('/signin', ownerSignIn);

module.exports = router;





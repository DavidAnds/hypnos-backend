const express = require('express');
const router = express.Router();
const adminCtrl = require('./adminCtrl')


router.post('/signup', adminCtrl.signup);
router.post('/signin', adminCtrl.signin);

module.exports = router;
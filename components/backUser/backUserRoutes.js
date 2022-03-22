const express = require('express');
const router = express.Router();
const backUserCtrl = require('./backUserCtrl');
const verifyAuth = require('../middleware/verifyAuth');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/signup', backUserCtrl.signup);
router.post('/login', backUserCtrl.login);
router.get('/logout', verifyAuth, verifyAdmin, backUserCtrl.logout);
router.get('/refresh', verifyAuth, backUserCtrl.refresh);
router.get('/getAll', verifyAuth, backUserCtrl.getAll);
router.get('/getOne/:id', verifyAuth, verifyAdmin, backUserCtrl.getOne);
router.put('/updateInfo/:id',verifyAuth, verifyAdmin, backUserCtrl.updateInfo);
router.put('/updatePassword/:id', verifyAuth, verifyAdmin, backUserCtrl.updatePassword);
router.delete('/deleteOne/:id', verifyAuth, verifyAdmin, backUserCtrl.deleteOne);

module.exports = router;
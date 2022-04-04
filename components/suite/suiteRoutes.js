const express = require('express');
const router = express.Router();
const suiteCtrl = require('./suiteCtrl');
const verifyAuth = require('../middleware/verifyAuth');
const multer = require('../middleware/multer-config');

router.post('/createOne', verifyAuth, multer, suiteCtrl.createOne);
router.get('/getAll/:hotelId', suiteCtrl.getAll);
router.get('/getOne/:id', suiteCtrl.getOne);
router.put('/updateOne/:id', verifyAuth, multer, suiteCtrl.updateOne);
router.delete('/deleteOne/:id', verifyAuth, suiteCtrl.deleteOne);

module.exports = router;

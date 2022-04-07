const express = require('express');
const router = express.Router();
const hotelCtrl = require('./hotelCtrl');
const verifyAuth = require('../middleware/verifyAuth');
const verifyAdmin = require('../middleware/verifyAdmin');
const multer = require('../middleware/multer-config')


router.post('/createOne', verifyAuth, verifyAdmin, multer, hotelCtrl.createOne);
router.put('/updateOne/:id', verifyAuth, verifyAdmin, multer, hotelCtrl.updateOne);
router.delete('/deleteOne/:id', verifyAuth, verifyAdmin, hotelCtrl.deleteOne);
router.get('/getAll', hotelCtrl.getAll);
router.get('/getOne/:id', hotelCtrl.getOne);

module.exports = router;

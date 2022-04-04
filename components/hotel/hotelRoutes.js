const express = require('express');
const router = express.Router();
const hotelCtrl = require('./hotelCtrl');
const verifyAuth = require('../middleware/verifyAuth');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/createOne', verifyAuth, hotelCtrl.createOne);
router.get('/getAll', hotelCtrl.getAll);
router.get('/getOne/:id', hotelCtrl.getOne);
router.put('/updateOne/:id', verifyAuth, verifyAdmin, hotelCtrl.updateOne);
router.delete('/deleteOne/:id', verifyAuth, verifyAdmin, hotelCtrl.deleteOne);

module.exports = router;

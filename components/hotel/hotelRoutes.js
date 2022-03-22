const express = require('express');
const router = express.Router();
const hotelCtrl = require('./hotelCtrl');
const verifyAuth = require('../middleware/verifyAuth');

router.post('/createOne', verifyAuth, hotelCtrl.createOne);
router.get('/getAll', hotelCtrl.getAll);
router.get('/getOne/:id', hotelCtrl.getOne);
router.put('/updateOne/:id', verifyAuth, hotelCtrl.updateOne);
router.delete('/deleteOne/:id', verifyAuth, hotelCtrl.deleteOne);

module.exports = router;

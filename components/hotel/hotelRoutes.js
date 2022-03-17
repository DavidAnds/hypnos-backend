const express = require('express');
const router = express.Router();
const hotelCtrl = require('./hotelCtrl');
const adminCheck = require('../middleware/AdminCheck');

router.post('/createOne', adminCheck, hotelCtrl.createOne);
router.get('/getAll', hotelCtrl.getAll);
router.get('/getOne/:id', hotelCtrl.getOne);
router.put('/updateOne/:id', adminCheck, hotelCtrl.updateOne);
router.delete('/deleteOne/:id', adminCheck, hotelCtrl.deleteOne);

module.exports = router;

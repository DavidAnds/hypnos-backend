const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth')
const reservationCtrl = require('./reservationCtrl');

router.post('/createOne',verifyAuth, reservationCtrl.createOne);
router.get('/getAll/:userId', reservationCtrl.getAll);
router.get('/getAllFromSuite/:suiteId', reservationCtrl.getAllFromSuite);
router.delete('/deleteOne/:id', verifyAuth, reservationCtrl.deleteOne);


module.exports = router;
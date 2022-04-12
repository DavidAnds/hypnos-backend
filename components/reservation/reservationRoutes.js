const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth')
const reservationCtrl = require('./reservationCtrl');

router.post('/createOne',verifyAuth, reservationCtrl.createOne);
router.get('/getAll/:suiteId', reservationCtrl.getAll);


module.exports = router;
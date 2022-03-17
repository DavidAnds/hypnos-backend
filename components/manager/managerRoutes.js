const express = require('express');
const router = express.Router();
const managerCtrl = require('./managerCtrl');
const adminCheck = require('../middleware/AdminCheck');

router.post('/createOne', adminCheck, managerCtrl.createOne);
router.get('/getAll', adminCheck, managerCtrl.getAll);
router.get('/getOne/:id', adminCheck, managerCtrl.getOne);
router.put('/updateInfo/:id', adminCheck, managerCtrl.updateInfo);
router.put('/updatePassword/:id', adminCheck, managerCtrl.updatePassword);
router.delete('/deleteOne/:id', adminCheck, managerCtrl.deleteOne);

module.exports = router;

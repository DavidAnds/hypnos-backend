const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth');
const multer = require('../middleware/multer-config');
const galleryImageCtrl = require('./galleryImageCtrl')

router.post('/createOne', verifyAuth, multer, galleryImageCtrl.createOne)
router.delete('/deleteOne', verifyAuth, multer, galleryImageCtrl.deleteOne )
router.delete('/getAll/:suiteId', galleryImageCtrl.getAll )

module.exports = router;
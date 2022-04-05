const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth');
const multer = require('../middleware/multer-config');
const galleryImageCtrl = require('./galleryImageCtrl')

router.post('/createOne', verifyAuth, multer, galleryImageCtrl.createOne)
router.delete('/deleteOne/:id', verifyAuth, multer, galleryImageCtrl.deleteOne )
router.get('/getAll/:suiteId', galleryImageCtrl.getAll )

module.exports = router;
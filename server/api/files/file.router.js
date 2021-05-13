const router = require('express').Router()
// const upload = require('../../config/multer.config')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { verifyBearerToken } = require('./../../auth/token_validation')
const { uploadFile, getFiles, getFileById, updateFile, downloadFile, deleteFile } = require('./file.controller')

router.get('/list', verifyBearerToken, getFiles)
router.post('/upload', verifyBearerToken, upload.single('file'), uploadFile)
router.get('/:id', verifyBearerToken, getFileById)
router.get('/download/:id', verifyBearerToken, downloadFile)
router.put('/update/:id', verifyBearerToken, updateFile)
router.delete('/delete/:id', verifyBearerToken, deleteFile)

module.exports = router 

const router = require('express').Router()
const { verifyBearerToken } = require('./../../auth/token_validation')
const { uploadFile, getFiles, getFileById, updateFile, deleteFile } = require('./file.controller')

router.get('/list', verifyBearerToken, getFiles)
router.post('/upload', verifyBearerToken, uploadFile)
router.get('/:id', verifyBearerToken, getFileById)
// router.get('/download/:id', verifyBearerToken, )
router.put('/update/:id', verifyBearerToken, updateFile)
router.delete('/delete/:id', verifyBearerToken, deleteFile)

module.exports = router 

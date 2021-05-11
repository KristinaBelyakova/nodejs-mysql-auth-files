const { createUser, getUserById, signin, refreshToken, logout } = require('./user.controller')
const router = require('express').Router()
const { verifyBearerToken } = require('./../../auth/token_validation')

router.post('/signup', verifyBearerToken, createUser)
router.get('/info/:id', verifyBearerToken, getUserById)
router.post('/signin', signin)
router.post('/signin/new_token', refreshToken)
router.get('/logout', verifyBearerToken, logout )

module.exports = router 

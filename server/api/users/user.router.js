const { createUser, getUserById, signin } = require('./user.controller')
const router = require('express').Router()

router.post('/signup', createUser)
router.get('/info/:id', getUserById)
router.post('/signin', signin)

module.exports = router 

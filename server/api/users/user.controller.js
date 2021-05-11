const { create, getUserById, getUserByEmail } = require('./user.service')

const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
  createUser: (req, res) => {
    const body = req.body
    const salt = genSaltSync(10)
    body.password = hashSync(body.password, salt)
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'Database connection error'
        })
      }
      return res.status(200).json({
        success: true,
        data: results
      })
    })
  },

  getUserById: (req, res) => {
    const id = req.params.id
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: 'User Not Found'
        })
      }
      return res.json({
        success: true,
        data: results
      })
    })
  },

  signin: (req, res) => {
    const { email, password } = req.body
    getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: false,
          data: 'Invalid email or password'
        })
      }
      const result = compareSync(password, results.password)
      if (result) {
        results.password = undefined
        const jsontoken = sign({ result: results }, 'qwe1234', {
          expiresIn: '10m',
        })
        return res.json({
          success: true,
          message: 'Login successfully',
          token: jsontoken
        })
      } else {
        return res.json({
          success: false,
          data: 'Invalid email or password '
        })
      }
    })

  }
}

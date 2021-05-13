const { create, getUserById, getUserByEmail } = require('./user.service')

const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')

let tokensList = {}

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
        const bearer_token = jwt.sign({ result: results }, process.env.JWT_ACCESS_SECRET, {
          expiresIn: '10m',
        })
        const refresh_token = jwt.sign({ result: results }, process.env.JWT_REFRESH_SECRET, {
          expiresIn: '10m',
        })
        const response = {
          success: true,
          message: 'Login successfully',
          bearer_token,
          refresh_token
        }
        tokensList[bearer_token] = response
        res.status(200).json(response)
      } else {
        return res.json({
          success: false,
          data: 'Invalid email or password '
        })
      }
    })
  },

  refreshToken: (req, res) => {
    const { email, refresh_token } = req.body
    if ((refresh_token) && (refresh_token in tokensList)) {
      const user = {
        email
      }
      const token = jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: '10m' })
      const response = {
        "token": token,
      }
      console.log(response);
      tokensList[refresh_token] = token
      res.status(200).json(response);
    } else {
      res.status(404).send('Invalid request')
    }
  },

  logout: (req, res) => {
    const { token } = req.body
    if (token in tokensList) {
      delete tokensList[token]
      res.json({
        success: true,
        message: 'Logout successfully'
      })
    }
    res.json({
      success: false,
      message: 'Logout unsuccessfully'
    })
  },
}

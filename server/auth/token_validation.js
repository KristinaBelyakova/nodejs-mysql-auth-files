const { verify, sign } = require('jsonwebtoken')

module.exports = {
  verifyBearerToken: (req, res, next) => {
    let token = req.headers['authorization'] 
    if (token) {
      token = token.split(' ')[1]
      verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(403).json({
            success: false,
            message: 'Invalid token'
          })
        }
        req.decoded = decoded
        next()
      })
    } else {
      return res.status(403).json({
        success: false,
        message: 'User not authenticated'
      })
    }
  }

}

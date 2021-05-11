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
  },

  // verifyRefreshToken: (req, res, next) => {
  //   let refresh_token  = req.body.refresh_token
  //   // console.log(token);
  //   if (!refresh_token) {
  //     return res.status(403).json({
  //       success: false,
  //       message: 'User not authenticated'
  //     })
  //   }
  //   if (refresh_token) {
  //     refresh_token = refresh_token.split(' ')[1]
  //     verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
  //       if (!err) {
  //         const bearer_token = sign(decoded, process.env.JWT_ACCESS_SECRET, { expiresIn: '10m' })
  //         return res.status(201).json({bearer_token})
  //       } next()
  //     })
  //   } else {
  //     res.status(403).json({
  //       success: false,
  //       message: 'User not authenticated'
  //     })
  //   }
  // },

}

const pool = require('../../config/db.config')

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(name, email, phone, password)
      values(?,?,?,?)`,
      [
        data.name,
        data.email,
        data.phone,
        data.password
      ],
      (error, results, fields) => {
        if (error) {
         return callBack(error)
        }
        return callBack(null, results)
      }
    )
  }
}

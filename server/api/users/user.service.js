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
  },

  getUserById: (id, callBack) => {
    pool.query(
      `select id, name, email, phone from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error)
        }
        return callBack(null, results[0])
      }
    )
  },

  getUserByEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error)
        }
        return callBack(null, results[0])
      }
    )
  }
}

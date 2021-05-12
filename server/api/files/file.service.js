const pool = require('../../config/db.config')

module.exports = {
  createFile: (data, callBack) => {
    pool.query(
      `insert into files(fileName, extension, mymeType, size, uploadDate)
         values(?,?,?,?,?)`,
      [
        data.fileName,
        data.extension,
        data.mymeType,
        data.size,
        data.uploadDate
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error)
        }
        return callBack(null, results)
      }
    )
  },

  getFiles: (callBack) => {
    pool.query(
      `select id, fileName, extension, mymeType, size, uploadDate from files`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error)
        }
        return callBack(null, results)
      }
    )
  },

  getFileById: (id, callBack) => {
    pool.query(
      `select id, fileName, extension, mymeType, size, uploadDate from files where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error)
        }
        return callBack(null, results[0])
      }
    )
  },

  updateFile: (data, callBack) => {
    console.log(data);
    pool.query(
      `update files set fileName=?, extension=?, mymeType=?, size=?, uploadDate=? where id=?`,
      [
        data.fileName,
        data.extension,
        data.mymeType,
        data.size,
        data.uploadDate,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error)
        }
        return callBack(null, results[0])
      }
    )
  },

  deleteFile: (data, callBack) => {
    pool.query(
      `delete from files where id=?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error)
        }
        return callBack(null, results[0])
      }
    )
  }
}

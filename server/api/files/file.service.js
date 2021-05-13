const pool = require('../../config/db.config')

module.exports = {
  createFile: (data, callBack) => {
    pool.query(
      `insert into files(fileName, extension, mimeType, size, uploadDate)
         values(?,?,?,?,?)`,
      [
        data.filename,
        data.encoding,
        data.mimetype,
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

  getFiles: (page, list_size, callBack) => {
    pool.query(
      `select id, fileName, extension, mimeType, size, uploadDate from files limit ?, ?`,
      [
        (page - 1) * list_size,
        parseInt(list_size)
      ],
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
      `select id, fileName, extension, mimeType, size, uploadDate from files where id = ?`,
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
    pool.query(
      `update files set fileName=?, extension=?, mimeType=?, size=?, uploadDate=? where id=?`,
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

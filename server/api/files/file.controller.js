const { createFile, getFiles, getFileById, updateFile, deleteFile } = require('./file.service')

module.exports = {
  uploadFile: (req, res) => {
    const body = req.body
    createFile(body, (err, results) => {
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

  getFiles: (req, res) => {
    getFiles((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: true,
        data: results
      })
    })
  },

  getFileById: (req, res) => {
    const id = req.params.id
    getFileById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: 'File Not Found'
        })
      }
      return res.json({
        success: true,
        data: results
      })
    })
  },

  updateFile: (req, res) => {
    const body = req.body
    updateFile(body, (err, results) => {
      if (err) {
        console.log(err);
        return false;
      }
      return res.status(200).json({
        success: true,
        message: 'Updated successfully'
      })
    })
  },

  deleteFile: (req, res) => {
    const data = req.body
    deleteFile(data, (err, results) => {
      if (err) {
        console.log(err);
        return false;
      }
      return res.json({
        success: true,
        message: 'Deleted successfully'
      })
    })
  }
}

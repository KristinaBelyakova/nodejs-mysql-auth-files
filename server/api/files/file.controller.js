const path = require('path')
const __basedir = path.resolve(path.dirname(''));
const uploadFolder = __basedir + '/uploads/';
const fs = require('fs');

const { createFile, getFiles, getFileById, updateFile, deleteFile } = require('./file.service')

module.exports = {
  uploadFile: (req, res) => {
    createFile(req.file, (err, results) => {
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
    const { page, list_size } = req.body
    getFiles(page, list_size, (err, results) => {
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
          message: 'File not found'
        })
      }
      return res.json({
        success: true,
        data: results
      })
    })
  },

  updateFile: (req, res) => {
    const id = req.params.id
    getFileById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'File not found'
        });
      }
      if (results !== undefined) {
        const filename = results.fileName
        updateFile(id, req.file, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          fs.rmdir(uploadFolder + filename, { recursive: true }, (err) => {
            console.log(err)
          });
          return res.status(200).json({
            success: true,
            message: 'Updated successfully'
          })
        })
      }
      return res.json({
        message: 'File not found'
      })
    })
  },

  downloadFile: (req, res) => {
    const id = req.params.id
    getFileById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      const filename = results.fileName
      res.download(uploadFolder + filename)
    })
  },

  deleteFile: (req, res) => {
    const id = req.params.id
    getFileById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      const filename = results.fileName
      deleteFile(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        fs.rmdir(uploadFolder + filename, { recursive: true }, (err) => { 
          console.log(err) 
        });
        return res.status(200).json({
          success: true,
          message: 'Deleted successfully'
        })
      })
    })
  }
}

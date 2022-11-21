const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const collectSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: "User"
  },
  video: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Video"
  },
  ...baseModel
})

module.exports = collectSchema
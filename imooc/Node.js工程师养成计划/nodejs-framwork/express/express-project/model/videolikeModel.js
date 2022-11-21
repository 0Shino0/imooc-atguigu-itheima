const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const videolikeSchema = new mongoose.Schema({
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
  like: {
    type: Number,
    enum: [1, -1],
    required:true
  },
  ...baseModel
})

module.exports = videolikeSchema
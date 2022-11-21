const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const videocommentSchema = new mongoose.Schema({
  content:{
    type:String,
    required:true
  },
  video:{
    type:mongoose.ObjectId,
    required:true,
    ref:'Video'
  },
  user:{
    type:mongoose.ObjectId,
    required:true,
    ref:'User'
  },
  ...baseModel
})

module.exports = videocommentSchema
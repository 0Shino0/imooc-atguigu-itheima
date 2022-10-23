import mongoose from '../config/DBHelpler'

const Schema = mongoose.Schema

const tidSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  uid: String
})

const uidSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String
})
const cuidSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String
})

const CommentsSchema = new Schema({
  tid: { type: tidSchema },
  uid: { type: uidSchema },
  cuid: { type: cuidSchema },
  content: { type: String },
  created: { type: Date },
  hands: { type: Number, default: 0 },
  status: { type: String, default: '1' },
  isBest: { type: String, default: '0' }
})

const CommentsUsers = mongoose.model('comments_users', CommentsSchema)

export default CommentsUsers

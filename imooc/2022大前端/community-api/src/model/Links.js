import mongoose from '@/config/DBHelpler'

const Schema = mongoose.Schema

const LinksSchema = new Schema({
  title: { type: String, default: '' },
  link: { type: String, default: '' },
  type: { type: String, default: 'link' },
  isTop: { type: String, default: '' },
  sort: { type: String, default: '' }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

const Links = mongoose.model('links', LinksSchema)

export default Links

import mongoose from '@/config/DBHelpler'

const Schema = mongoose.Schema

const MenuSchema = new Schema({
  title: { type: String, default: '' },
  name: { type: String, default: '' },
  path: { type: String, default: '' },
  component: { type: String, default: '' },
  hideInBread: { type: Boolean, default: false },
  hideInMenu: { type: Boolean, default: false },
  notCache: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  sort: { type: String, default: 0 },
  link: { type: String, default: '' },
  redirect: { type: String, default: '' },
  type: { type: String, default: 'menu' },
  // 配合tree组件，展开对应的树形结构
  expand: { type: Boolean, default: true }
})

const OperationSchema = new Schema({
  name: { type: String, default: '' },
  type: { type: String, default: '' },
  method: { type: String, default: '' },
  path: { type: String, default: '' },
  regmark: { type: String, default: '' }
})

MenuSchema.add({
  children: [MenuSchema],
  operations: [OperationSchema]
})

const Menus = mongoose.model('menus', MenuSchema)

export default Menus

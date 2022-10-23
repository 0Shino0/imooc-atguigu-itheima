import moogoose from '../config/DBHelpler'

const Schema = moogoose.Schema

const WxDeviceSchema = new Schema({
  uid: { type: String, ref: 'user' },
  device: { type: String }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

WxDeviceSchema.statics = {
  addOneIfNew (uid, device) { // 如果是新设备，就添加进设备记录表
    this.isSameDevice(uid, device).then(isSame => {
      if (!isSame) {
        this.create({ uid, device })
      }
    })
  },
  isSameDevice (uid, currentDevice) { // 检测是否跟上一次的登录用的同一个设备
    return this.findOne({ uid }).sort({ created: -1 }).then(doc => {
      return doc ? doc.device === currentDevice : false
    })
  }
}

const WxDevice = moogoose.model('wx_device', WxDeviceSchema)

export default WxDevice

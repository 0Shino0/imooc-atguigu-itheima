import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

const moment = (date) => {
  // 超过7天，显示日期
  if (dayjs(date).isBefore(dayjs().subtract(7, 'days'))) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    // 1小前，xx小时前，X天前
    return dayjs(date).locale('zh-cn').from(dayjs())
  }
}

const hours = (date) => {
  return dayjs(date).format('HH:mm:ss')
}

// ...

export default {
  moment,
  hours
}

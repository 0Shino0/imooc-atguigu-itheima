import moment from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

moment.extend(relativeTime)

export const formatDate = (date: string) => {
  // 超过7天，显示日期
  if (moment(date).isBefore(moment().subtract(7, 'day'))) {
    return moment(date).format('YYYY-MM-DD')
  } else {
    // 1小前，xx小时前，X天前
    return moment(date).locale('zh-cn').from(moment())
  }
}

export const hours = (date: string) => {
  if (moment(date).isBefore(moment(moment().format('YYYY-MM-DD 00:00:00')))) {
    return moment(date).format('YYYY-MM-DD')
  } else {
    // 1天内
    return moment(date).format('HH:mm:ss')
  }
}

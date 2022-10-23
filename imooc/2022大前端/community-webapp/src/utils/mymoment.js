import moment from 'dayjs'

// 取得星期几，星期天返回0
export const getDay = (_date) => {
  return Number(moment(_date).format('d'))
}

export const fromNow = (date, needFormat) => {
  if (moment(date).isBefore(moment().subtract(7, 'days')) || needFormat) {
    return moment(date).format('YYYY-MM-DD')
  } else {
    return moment(date).fromNow()
  }
}

export const getDiffFromNow = (_date) => {
  const today = moment().format('YYYY-MM-DD')
  return moment(today).diff(moment(_date).format('YYYY-MM-DD'), 'days')
}

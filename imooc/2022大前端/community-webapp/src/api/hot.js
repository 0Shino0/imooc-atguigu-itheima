import axios from '@/utils/request'
import qs from 'qs'

// 获取热门文章
export const getHotPost = (data) => axios.get('/public/hotPost?' + qs.stringify(data))

// 获取热门评论
export const getHotComments = (data) => axios.get('/public/hotComments?' + qs.stringify(data))

// 获取签到排行
export const getHotSignRecord = (data) => axios.get('/public/hotSignRecord?' + qs.stringify(data))

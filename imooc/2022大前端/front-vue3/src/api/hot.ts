import axios from '@/common/request'
import qs from 'qs'
import { PageCommon } from '../common/interface'

// 获取热门文章
export const getHotPost = (data: PageCommon) => axios.get('/public/hotPost?' + qs.stringify(data))

// 获取热门评论
export const getHotComments = (data: PageCommon) => axios.get('/public/hotComments?' + qs.stringify(data))

// 获取签到排行
export const getHotSignRecord = (data: PageCommon) => axios.get('/public/hotSignRecord?' + qs.stringify(data))

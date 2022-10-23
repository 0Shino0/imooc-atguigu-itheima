import Vue from 'vue'

const axios = Vue.prototype.$u

// 获取热门文章
export const getHotPost = (data) => axios.get('/public/hotPost', data)

// 获取热门评论
export const getHotComments = (data) => axios.get('/public/hotComments', data)

// 获取签到排行
export const getHotSignRecord = (data) => axios.get('/public/hotSignRecord', data)

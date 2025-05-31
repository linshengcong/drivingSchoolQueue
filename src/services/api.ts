import Taro from '@tarojs/taro'

// API基础配置
const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api'
  : 'https://your-api-domain.com/api'

// 请求拦截器
const request = (options: any) => {
  const { url, ...otherOptions } = options

  return Taro.request({
    url: BASE_URL + url,
    header: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Taro.getStorageSync('token') || ''}`,
    },
    ...otherOptions,
  }).then((res) => {
    const { statusCode, data } = res

    if (statusCode >= 200 && statusCode < 300) {
      return data
    }

    // 处理错误状态码
    if (statusCode === 401) {
      // 清除token，跳转到登录页
      Taro.removeStorageSync('token')
      Taro.reLaunch({ url: '/pages/login/index' })
      return Promise.reject(new Error('未授权'))
    }

    return Promise.reject(new Error(data?.message || '请求失败'))
  }).catch((error) => {
    console.error('API请求错误:', error)
    Taro.showToast({
      title: error.message || '网络异常',
      icon: 'none',
    })
    return Promise.reject(error)
  })
}

export default request

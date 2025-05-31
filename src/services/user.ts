import request from './api'
import { UserInfo } from '../store/userStore'

// 登录
export const login = (code: string) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data: { code },
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET',
  })
}

// 更新用户信息
export const updateUserInfo = (userInfo: Partial<UserInfo>) => {
  return request({
    url: '/user/update',
    method: 'PUT',
    data: userInfo,
  })
}

// 绑定手机号
export const bindPhone = (encryptedData: string, iv: string) => {
  return request({
    url: '/user/bind-phone',
    method: 'POST',
    data: { encryptedData, iv },
  })
}

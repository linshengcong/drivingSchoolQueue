import { useCallback } from 'react'
import Taro from '@tarojs/taro'
import { useUserStore } from '../store'
import { login as loginApi } from '../services/user'

export const useAuth = () => {
  const { userInfo, isLogin, setUserInfo, setToken, logout } = useUserStore()

  // 微信登录
  const wxLogin = useCallback(async () => {
    try {
      const { code } = await Taro.login()
      const res = await loginApi(code)

      if (res.success) {
        setUserInfo(res.data.userInfo)
        setToken(res.data.token)

        // 保存token到本地存储
        Taro.setStorageSync('token', res.data.token)
        Taro.setStorageSync('userInfo', res.data.userInfo)

        return res.data
      }

      throw new Error(res.message || '登录失败')
    } catch (error) {
      console.error('登录失败:', error)
      Taro.showToast({
        title: '登录失败',
        icon: 'none',
      })
      throw error
    }
  }, [setUserInfo, setToken])

  // 检查登录状态
  const checkLoginStatus = useCallback(() => {
    const token = Taro.getStorageSync('token')
    const cachedUserInfo = Taro.getStorageSync('userInfo')

    if (token && cachedUserInfo) {
      setToken(token)
      setUserInfo(cachedUserInfo)
      return true
    }

    return false
  }, [setToken, setUserInfo])

  // 退出登录
  const handleLogout = useCallback(() => {
    logout()
    Taro.removeStorageSync('token')
    Taro.removeStorageSync('userInfo')

    // 跳转到登录页
    Taro.reLaunch({
      url: '/pages/login/index'
    })
  }, [logout])

  return {
    userInfo,
    isLogin,
    wxLogin,
    checkLoginStatus,
    logout: handleLogout,
  }
}

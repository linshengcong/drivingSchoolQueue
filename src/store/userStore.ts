import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface UserInfo {
  id: string
  nickname: string
  avatar: string
  phone?: string
  studentId?: string
  drivingSchool?: string
}

interface UserState {
  userInfo: UserInfo | null
  isLogin: boolean
  token: string | null
}

interface UserActions {
  setUserInfo: (userInfo: UserInfo) => void
  setToken: (token: string) => void
  logout: () => void
  login: (userInfo: UserInfo, token: string) => void
}

type UserStore = UserState & UserActions

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      // State
      userInfo: null,
      isLogin: false,
      token: null,

      // Actions
      setUserInfo: (userInfo) =>
        set((state) => ({
          ...state,
          userInfo,
          isLogin: true
        }), false, 'setUserInfo'),

      setToken: (token) =>
        set((state) => ({
          ...state,
          token
        }), false, 'setToken'),

      logout: () =>
        set({
          userInfo: null,
          isLogin: false,
          token: null,
        }, false, 'logout'),

      login: (userInfo, token) =>
        set({
          userInfo,
          isLogin: true,
          token,
        }, false, 'login'),
    }),
    { name: 'user-store' }
  )
)

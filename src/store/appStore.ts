import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AppState {
  loading: boolean
  theme: 'light' | 'dark'
  networkStatus: 'online' | 'offline'
  systemInfo: any
  tabBarIndex: number
}

interface AppActions {
  setLoading: (loading: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  setNetworkStatus: (status: 'online' | 'offline') => void
  setSystemInfo: (info: any) => void
  setTabBarIndex: (index: number) => void
}

type AppStore = AppState & AppActions

export const useAppStore = create<AppStore>()(
  devtools(
    (set) => ({
      // State
      loading: false,
      theme: 'light',
      networkStatus: 'online',
      systemInfo: null,
      tabBarIndex: 0,

      // Actions
      setLoading: (loading) =>
        set({ loading }, false, 'setLoading'),

      setTheme: (theme) =>
        set({ theme }, false, 'setTheme'),

      setNetworkStatus: (status) =>
        set({ networkStatus: status }, false, 'setNetworkStatus'),

      setSystemInfo: (info) =>
        set({ systemInfo: info }, false, 'setSystemInfo'),

      setTabBarIndex: (index) =>
        set({ tabBarIndex: index }, false, 'setTabBarIndex'),
    }),
    { name: 'app-store' }
  )
)

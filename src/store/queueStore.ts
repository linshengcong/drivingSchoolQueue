import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface QueueItem {
  id: string
  studentId: string
  studentName: string
  studentAvatar: string
  coachId: string
  coachName: string
  carId: string
  carNumber: string
  queueNumber: number
  estimatedTime: string
  status: 'waiting' | 'practicing' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface Coach {
  id: string
  name: string
  avatar: string
  phone: string
  carId: string
  carNumber: string
  currentStudent?: string
  queueCount: number
  status: 'available' | 'busy' | 'offline'
}

interface QueueState {
  queueList: QueueItem[]
  coachList: Coach[]
  currentQueue: QueueItem | null
  myQueuePosition: number
  estimatedWaitTime: string
}

interface QueueActions {
  setQueueList: (list: QueueItem[]) => void
  setCoachList: (list: Coach[]) => void
  addToQueue: (item: QueueItem) => void
  removeFromQueue: (id: string) => void
  updateQueueStatus: (id: string, status: QueueItem['status']) => void
  setCurrentQueue: (queue: QueueItem | null) => void
  updateMyPosition: (position: number, waitTime: string) => void
  clearQueue: () => void
}

type QueueStore = QueueState & QueueActions

export const useQueueStore = create<QueueStore>()(
  devtools(
    (set, get) => ({
      // State
      queueList: [],
      coachList: [],
      currentQueue: null,
      myQueuePosition: 0,
      estimatedWaitTime: '0分钟',

      // Actions
      setQueueList: (list) =>
        set({ queueList: list }, false, 'setQueueList'),

      setCoachList: (list) =>
        set({ coachList: list }, false, 'setCoachList'),

      addToQueue: (item) =>
        set((state) => ({
          queueList: [...state.queueList, item]
        }), false, 'addToQueue'),

      removeFromQueue: (id) =>
        set((state) => ({
          queueList: state.queueList.filter(item => item.id !== id)
        }), false, 'removeFromQueue'),

      updateQueueStatus: (id, status) =>
        set((state) => ({
          queueList: state.queueList.map(item =>
            item.id === id ? { ...item, status } : item
          )
        }), false, 'updateQueueStatus'),

      setCurrentQueue: (queue) =>
        set({ currentQueue: queue }, false, 'setCurrentQueue'),

      updateMyPosition: (position, waitTime) =>
        set({
          myQueuePosition: position,
          estimatedWaitTime: waitTime
        }, false, 'updateMyPosition'),

      clearQueue: () =>
        set({
          queueList: [],
          currentQueue: null,
          myQueuePosition: 0,
          estimatedWaitTime: '0分钟'
        }, false, 'clearQueue'),
    }),
    { name: 'queue-store' }
  )
)

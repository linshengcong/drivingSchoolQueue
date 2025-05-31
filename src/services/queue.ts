import request from './api'
import { QueueItem, Coach } from '../store/queueStore'

// 获取教练列表
export const getCoachList = () => {
  return request({
    url: '/coaches',
    method: 'GET',
  })
}

// 获取排队列表
export const getQueueList = (coachId?: string) => {
  return request({
    url: '/queue',
    method: 'GET',
    data: coachId ? { coachId } : {},
  })
}

// 加入排队
export const joinQueue = (coachId: string) => {
  return request({
    url: '/queue/join',
    method: 'POST',
    data: { coachId },
  })
}

// 取消排队
export const cancelQueue = (queueId: string) => {
  return request({
    url: `/queue/${queueId}/cancel`,
    method: 'POST',
  })
}

// 获取我的排队状态
export const getMyQueueStatus = () => {
  return request({
    url: '/queue/my-status',
    method: 'GET',
  })
}

// 更新排队状态（教练端使用）
export const updateQueueStatus = (queueId: string, status: QueueItem['status']) => {
  return request({
    url: `/queue/${queueId}/status`,
    method: 'PUT',
    data: { status },
  })
}

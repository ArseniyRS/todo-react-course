import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:3001/'
})

export const getTaskListReq = () => instance.get('tasks')
export const createTaskReq = (taskObj) => instance.post('tasks', taskObj)
export const deleteTaskReq = (id) => instance.delete(`tasks/${id}`)
export const editStatusTaskReq = (id, data) => instance.patch(`tasks/${id}`, data)
export const editTaskReq = (id, taskObj) => instance.patch(`tasks/${id}`, taskObj)
export const getSearchedTasksReq = (value) => instance.get(`tasks?q=${value}`)
export const getUserById = (id) => instance.get(`users/${id}`)
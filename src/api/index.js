import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const getTaskList = () => instance.get('todos?_limit=15')
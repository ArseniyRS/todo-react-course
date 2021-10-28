import { useState, useEffect } from 'react'
import TaskList from "./Tasks/TaskList";
import '../styles/main.scss'
import { Route } from "react-router";
import CreateOrEditTaskFrom from './Tasks/CreateOrEditTaskFrom'
import {  createTaskReq, deleteTaskReq, getTaskListReq, editStatusTaskReq, editTaskReq, getSearchedTasksReq } from '../api'
import { ToastsContainer, ToastsStore } from 'react-toasts';

function App() {
  const [tasks, setTasks] = useState([])
  const [fetchTasks, setFetchTasks] = useState(false)

  const getData = async () => {
    setFetchTasks(true)
    const { data } = await getTaskListReq()
    setTasks(data)
    setFetchTasks(false)
  }
  useEffect(() => {
    getData()
  }, [])



  const createTaskStatus = async (id, state, btnValue) => {
    await editStatusTaskReq(id, {
      [btnValue]: state
    })
    await getData()
    ToastsStore[btnValue === 'completed' ? 'success' : 'warning'](`TASK №${id}\n"${btnValue.toUpperCase()}" STATE\nHAS BEEN CHANGED`)
  }


  const createTask = async (data) => {
    await createTaskReq(data)
    await getData()
  }

  const deleteTask = async id => {
    await deleteTaskReq(id)
    await getData()
    ToastsStore.error(`TASK №${id} HAS BEEN DELETED`)
  }


  const editTask = async (id, data) => {
    await editTaskReq(id, data)
    await getData()
  }

  const searchTasks = async (value) =>{
     setFetchTasks(true)
     const {data} = await getSearchedTasksReq(value)
     setTasks(data)
     setFetchTasks(false)
  }

  return (
    <div className="App">
      <ToastsContainer store={ToastsStore} />

      <Route path={['/', '/important', '/completed', '/deleted']} exact >
        <TaskList onSearch={searchTasks} loader={fetchTasks} tasks={tasks} onDeleteTask={deleteTask} onStatusTask={createTaskStatus} />
      </Route>
      <Route path={['/create-task', '/edit-task/:id']} exact >
        <CreateOrEditTaskFrom tasks={tasks} onSubmitForCreate={createTask} onSubmitForEdit={editTask} />
      </Route>
    </div>
  );
}

export default App;

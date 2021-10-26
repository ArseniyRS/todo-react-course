import { useState, useEffect } from 'react'
import TaskList from "./Tasks/TaskList";
import '../styles/main.scss'
import { Route } from "react-router";
import CreateTaskForm from './Tasks/CreateTaskFrom'
import { getTaskList } from '../api'
import {ToastsContainer, ToastsStore} from 'react-toasts';

function App() {
  const [tasks, setTasks] = useState([])
  const [fetchTasks, setFetchTasks] = useState(false)

  const getData = async () => {
    setFetchTasks(true)
    const { data } = await getTaskList()
    setTasks(data)
    setFetchTasks(false)
  }
  useEffect(() => {
    getData()
  }, [])



  const createTaskStatus = (id, state, btnValue) =>{
    const copyData = [...tasks]
    const changedData = copyData.map(task =>{
      if(task.id === id){
        task[btnValue] = state
      }
      return task
    })
    setTasks(changedData)
    ToastsStore[btnValue === 'completed' ? 'success' : 'warning'](`TASK №${id}\n"${btnValue.toUpperCase()}" STATE\nHAS BEEN CHANGED`)
  }


  const createTask = (data) =>setTasks([...tasks, data])

  const deleteTask = id =>{
    const idxNum = tasks.findIndex((item) => item.id === id)
    setTasks([...tasks.slice(0, idxNum), ...tasks.slice(idxNum+1)])
    ToastsStore.error(`TASK №${id} HAS BEEN DELETED`)
  }

  return (
    <div className="App">
        <ToastsContainer store={ToastsStore}/>
      <Route path={['/', '/important', '/completed', '/deleted']} exact >
        <TaskList loader={fetchTasks} tasks={tasks} onDeleteTask={deleteTask} onStatusTask={createTaskStatus} />
      </Route>
      <Route path={'/create-task'}  exact >
        <CreateTaskForm onSubmit={createTask} lastId={tasks.length+1}/>
        </Route>
    </div>
  );
}

export default App;

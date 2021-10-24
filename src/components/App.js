import { useState, useEffect } from 'react'
import TaskList from "./Tasks/TaskList";
import '../styles/main.scss'
import { Route } from "react-router";
import CreateTaskForm from './Tasks/CreateTaskFrom'
import { getTaskList } from '../api'

function App() {
  const [tasks, setTasks] = useState([])
  const getData = async () => {
    const { data } = await getTaskList()
    setTasks(data)
  }
  useEffect(() => {
    getData()
  }, [])

  const createTask = (data) =>setTasks([...tasks, data])
  console.log(tasks)
  return (
    <div className="App">
      <Route path={'/'} exact >
        <TaskList tasks={tasks} />
      </Route>
      <Route path={'/create-task'}  exact >
        <CreateTaskForm onSubmit={createTask} lastId={tasks.length+1}/>
        </Route>
    </div>
  );
}

export default App;

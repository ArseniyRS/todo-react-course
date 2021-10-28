import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import '../../styles/tasks.scss'
import AddTaskBtn from "./AddTaskBtn";
import { Link, withRouter } from 'react-router-dom'
import Preloader from '../Preloader';
import SearchTask from './SearchTask';


const TaskList = ({ tasks = [], onDeleteTask, onStatusTask, loader, onSearch, ...props }) => {
    const [filteredTasks, setFilteredTasks] = useState(tasks)

    useEffect(() => {
        chooseSort(props.location.pathname)
    }, [tasks, props.location.pathname])


    const chooseSort = (sortValue = '') => {
        const copyTasks = [...tasks]
        const copyNonDeleted = [...tasks.filter(task => !task.deleted)]
        switch (sortValue) {
            case '/important':
                return setFilteredTasks(copyNonDeleted.sort((a, b) => (b.important || false) - (a.important || false)))
            case '/completed':
                return setFilteredTasks(copyNonDeleted.sort((a, b) => b.completed - a.completed))
            case '/deleted':
                return setFilteredTasks(copyTasks.filter(task => task.deleted))
            default:
                return setFilteredTasks(copyNonDeleted)
        }
    }

    return (
        <div className="task-list">
            <SearchTask onSearch={onSearch}/>
            <div className="option-btns">
                <AddTaskBtn />
                <Link to="/" className="option-btn">All</Link>
                <Link to="/important" className="option-btn">Important</Link>
                <Link to="/completed" className="option-btn">Completed</Link>
                <Link to="/deleted" className="option-btn">Deleted</Link>
            </div>
           {filteredTasks.map(elem => <TaskItem key={elem.id} {...elem} onDeleteTask={onDeleteTask} onStatusTask={onStatusTask} />)}
        </div>
    )
}

export default withRouter(TaskList)
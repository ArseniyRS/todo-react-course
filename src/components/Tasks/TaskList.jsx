import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import '../../styles/tasks.scss'
import AddTaskBtn from "./AddTaskBtn";

const TaskList = ({tasks, onDeleteTask, onImportantOrCompletedTask})=>{
    return(
        <div className="task-list">
             <AddTaskBtn />
            {tasks.map(elem =><TaskItem key={elem.id} {...elem} onDeleteTask={onDeleteTask} onImportantOrCompletedTask={onImportantOrCompletedTask} />)}
        </div>
    )
}

export default TaskList
import React, { useEffect, useState } from 'react'
import { getTaskList } from '../../api'
import TaskItem from './TaskItem'
import '../../styles/tasks.scss'
import AddTaskBtn from "./AddTaskBtn";

const TaskList = ({tasks})=>{
    return(
        <div className="task-list">
             <AddTaskBtn />
            {tasks.map(elem =><TaskItem key={elem.id} {...elem} />)}
        </div>
    )
}

export default TaskList
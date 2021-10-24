import React, { useState } from 'react'


const TaskItem = ({title, id, userId, completed}) =>{
    const [isComplated, setIsComplated] = useState(completed)
    return(
        <div className="task-item" style={{backgroundColor: isComplated && '#53C570'}}>
            <span className="task-item__id">{id}</span>
            <span className="task-item__title" style={{textDecoration: isComplated ? 'line-through': 'none'}}>{title}</span>
        </div>
    )
}

export default TaskItem
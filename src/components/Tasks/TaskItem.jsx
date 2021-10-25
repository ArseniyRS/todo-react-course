import React, { useState } from 'react'


const TaskItem = ({title, id, userId, completed, onDeleteTask, onImportantOrCompletedTask, important = false}) =>{
    return(
        <div className="task-item" 
        style={{
            transform: completed ? 'scale(.95)' : important && 'scale(1.05)',
            border: (important && completed) ?  '5px solid #ADC700' : completed ? '5px solid #53C570' : important && '5px solid rgb(255, 207, 74)' 
            }}>
            <div>
            <span className="task-item__id">{id}</span>
            <span className="task-item__title" style={{textDecoration: completed ? 'line-through': 'none'}}>{title}</span>
            </div>
            <div className="task-item__btns">
                <button className={`task-item__btn ${completed ? 'completed-btn-active' : 'completed-btn'}`} onClick={()=>onImportantOrCompletedTask(id, !completed, 'completed')}><i class="fas fa-check"></i></button>
                <button className={`task-item__btn ${important ? 'imp-btn-active' : 'imp-btn'}`} onClick={()=>onImportantOrCompletedTask(id, !important, 'important')}><i class="fas fa-exclamation"></i></button>
                <button className="task-item__btn delete-btn" onClick={()=>onDeleteTask(id)}><i class="fas fa-trash"></i></button>
            </div>
        </div>
    )
}

export default TaskItem
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const TaskItem = ({ title, id, userId, completed, onDeleteTask, onStatusTask, important = false, deleted = false }) => {
    return (
        <div className="task-item"
            style={{
                transform: completed ? 'scale(.95)' : important && 'scale(1.05)',
                border: (important && completed) ? '5px solid #ADC700' : completed ? '5px solid #53C570' : important && '5px solid rgb(255, 207, 74)'
            }}>
            <div>
                <span className="task-item__id">{id}</span>
                <span className="task-item__title" style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</span>
            </div>
            <div className="task-item__btns">
                {deleted ?
                    <>
                        <button className={"task-item__btn completed-btn"} onClick={() => onStatusTask(id, false, 'deleted')}><i class="fas fa-undo"/></button>
                        <button className="task-item__btn delete-btn" onClick={() => onDeleteTask(id)}><i class="fas fa-times"/></button>
                    </>
                    :
                    <>
                        <Link className="task-item__btn edit-btn" to={`/edit-task/${id}`} ><i class="fas fa-pen"/></Link>
                        <button className={`task-item__btn ${completed ? 'completed-btn-active' : 'completed-btn'}`} onClick={() => onStatusTask(id, !completed, 'completed')}><i class="fas fa-check"/></button>
                        <button className={`task-item__btn ${important ? 'imp-btn-active' : 'imp-btn'}`} onClick={() => onStatusTask(id, !important, 'important')}><i class="fas fa-exclamation"/></button>
                        <button className="task-item__btn delete-btn" onClick={() => onStatusTask(id, !deleted, 'deleted')}><i class="fas fa-trash-restore"/></button>
                    </>
                }
            </div>
        </div>
    )
}

export default TaskItem
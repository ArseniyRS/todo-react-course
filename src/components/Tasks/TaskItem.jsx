import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { getUserById } from '../../api'


const TaskItem = ({ title, id, userId, completed, onDeleteTask, onStatusTask, important = false, deleted = false }) => {
    const [userInfo, setUserInfo] = useState(null)
    const [isShowUser, setIsShowUser] = useState(false)
    const getTasksUser = async () => {
        const { data } = await getUserById(userId)
        setUserInfo(data)
    }
    useEffect(() => {
        if (!userInfo && isShowUser) {
            getTasksUser()
        }
    }, [isShowUser])
    return (
        <div className="task-item"
            style={{
                transform: completed ? 'scale(.95)' : important && 'scale(1.05)',
                border: (important && completed) ? '5px solid #ADC700' : completed ? '5px solid #53C570' : important && '5px solid rgb(255, 207, 74)'
            }}
            onClick={() => setIsShowUser(!isShowUser)}
        >
            <div>
                <span className="task-item__id">{id}</span>
                <span className="task-item__title" style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</span>
            </div>
            <div className="task-item__btns">
                {deleted ?
                    <>
                        <button className={"task-item__btn completed-btn"} onClick={() => onStatusTask(id, false, 'deleted')}><i className="fas fa-undo" /></button>
                        <button className="task-item__btn delete-btn" onClick={() => onDeleteTask(id)}><i className="fas fa-times" /></button>
                    </>
                    :
                    <>
                        <Link className="task-item__btn edit-btn" to={`/edit-task/${id}`} ><i className="fas fa-pen" /></Link>
                        <button className={`task-item__btn ${completed ? 'completed-btn-active' : 'completed-btn'}`} onClick={() => onStatusTask(id, !completed, 'completed')}><i className="fas fa-check" /></button>
                        <button className={`task-item__btn ${important ? 'imp-btn-active' : 'imp-btn'}`} onClick={() => onStatusTask(id, !important, 'important')}><i className="fas fa-exclamation" /></button>
                        <button className="task-item__btn delete-btn" onClick={() => onStatusTask(id, !deleted, 'deleted')}><i className="fas fa-trash-restore" /></button>
                    </>
                }
            </div>
            {isShowUser && (userInfo &&
                <div className="task-item__user">
                    <span>ID: {userInfo.id}</span>
                    <span>Name: {userInfo.name}</span>
                    <span>Email: {userInfo.email}</span>
                </div>)}
        </div>
    )
}

export default TaskItem
import React, { useState } from 'react'
import {ToastsStore} from 'react-toasts';
import { withRouter } from 'react-router-dom';


const CreateTaskForm = ({onSubmit, lastId, ...props}) =>{
    const [inputTitle, setInputTitle] = useState('')
    const [inputUser, setInputUser] = useState(1)
    const [inputCompleted, setInputCompleted] = useState(false)
    return(
        <form className="create-task-form" onSubmit={(e)=>{
            e.preventDefault()
            onSubmit({
                title: inputTitle,
                userId: inputUser,
                completed: inputCompleted,
                id: lastId
            })
            ToastsStore.success("YEAH, TASK ADDED!!!")
            setTimeout(()=>{
                props.history.push('/')
            },2000)
        }}>
            <h1>CREATE FORM</h1>
            <input type="text" placeholder="enter title of task" value={inputTitle} onChange={(e)=>setInputTitle(e.target.value)}/>
            <input type="number" placeholder="enter number of user" value={inputUser}  onChange={(e)=>setInputUser(+e.target.value)}/>
            <label>
                <input type="checkbox"  value={inputCompleted}  onChange={()=>setInputCompleted(!inputCompleted)}/>
                Completed
            </label>
            
            <button>Save</button>
        </form>
    )
}

export default withRouter(CreateTaskForm)
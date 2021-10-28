import React, { useState } from 'react'
import { ToastsStore } from 'react-toasts';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';


const CreateOrEditTaskFrom = ({ onSubmitForCreate, onSubmitForEdit,  tasks, ...props }) => {
    const [inputTitle, setInputTitle] = useState('')
    const [inputUser, setInputUser] = useState(1)

    const [inputError, setInputError] = useState('')

    useEffect(() => {
        if (props.match.params.id) {
            const foundTask = tasks.find(task => task.id == props.match.params.id)
            if (foundTask) {
                setInputTitle(foundTask.title)
                setInputUser(foundTask.userId)
            }
        }
    }, [tasks])

    const minVals = (num) => {
        if (num > inputTitle.length) {
            setInputError(`Минимальное кол-во символов - ${num}`)
            return false
        }
        setInputError('')
        return true
    }
    //const [inputCompleted, setInputCompleted] = useState(false)
    return (
        <form className="create-task-form" onSubmit={(e) => {
            e.preventDefault()
            if (minVals(3)) {
                if (props.match.params.id) {
                    onSubmitForEdit(props.match.params.id, {
                        title: inputTitle,
                        userId: inputUser,
                    })
                } else {
                    onSubmitForCreate({
                        title: inputTitle,
                        userId: inputUser,
                        completed: false,
                        important: false,
                        deleted: false,
                    })
                }
            } else {
                return
            }
            ToastsStore.success("YEAH, TASK ADDED!!!")
            setTimeout(() => {
                props.history.push('/')
            }, 2000)
        }}>
            <h1>{props.match.params.id ? 'EDIT FORM' : 'CREATE FORM'}</h1>
            <label>
                Task:
                <input type="text" required placeholder="enter title of task" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
            </label>
            <span style={{ color: 'red' }}>{inputError}</span>
            <label>
                User ID:
                <input type="number" required placeholder="enter number of user" value={inputUser} onChange={(e) => setInputUser(+e.target.value)} />
            </label>

            {/* <label>
                <input type="checkbox"  value={inputCompleted}  onChange={()=>setInputCompleted(!inputCompleted)}/>
                Completed
            </label> */}

            <button>Save</button>
        </form>
    )
}

export default withRouter(CreateOrEditTaskFrom)
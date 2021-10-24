import React from 'react'
import { Link } from 'react-router-dom'



const AddTaskBtn = () =>{
    return(
        <Link className="add-task" to="/create-task">Add task</Link>
    )
}

export default AddTaskBtn
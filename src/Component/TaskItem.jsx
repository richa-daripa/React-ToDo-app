import React from 'react';
import './ToDoApp.css';
import tick from '../Asset/tick.png'
import nottick from '../Asset/not_tick.png'
import trash from '../Asset/delete.png'

const TaskItem = ({ text, id, isComplete, del, toggle }) => {
    return (
        <div className="taskList">
            <div className='content' >
                <img src={isComplete ? tick : nottick} alt="checked" onClick={() => { toggle(id) }}/>
                <p className={isComplete ? "completed" : "pending"}>
                    {text}
                </p>
            </div>
            <img onClick={() => { del(id) }} src={trash} alt="remove" />
        </div>

    );
}
export default TaskItem;
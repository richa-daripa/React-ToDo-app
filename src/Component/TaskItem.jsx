import React from 'react';
import './ToDoApp.css';
import tick from '../Asset/tick.png'
import nottick from '../Asset/not_tick.png'
import trash from '../Asset/delete.png'

const TaskItem = ({ text, id, isComplete, del, toggle }) => {
    return (
        <div className="taskList">
            <div className='content' onClick={() => { toggle(id) }}>
                <img src={isComplete ? tick : nottick} alt="checked" />
                <p style={{
                    textDecoration: isComplete ? 'line-through' : 'none',
                    color: isComplete ? 'gray' : 'black'
                }}>
                    {text}
                </p>
            </div>
            <img onClick={() => { del(id) }} src={trash} alt="remove" />
        </div>

    );
}
export default TaskItem;
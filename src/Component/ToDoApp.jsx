import React, { useState, useEffect, useRef } from 'react';
import './ToDoApp.css';
import icon from '../Asset/icon.png'
import TaskItem from './TaskItem';

const ToDoApp = () => {
    const inputRef = useRef();
    //const [taskAdd, setTaskAdd] = useState([]);//take the input text and store in it 

    // Load saved tasks from localStorage on component mount
    const [taskAdd, setTaskAdd] = useState(localStorage.getItem("tasklist") ? JSON.parse(localStorage.getItem("tasklist")) : []);


    const addTask = () => {
        const inputText = inputRef.current.value.trim();//taking input text and removing spaces from start and end
        //console.log(inputText);
        if (inputText === "") {
            alert("Please enter your task!");
            return;
        }
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTaskAdd((prev) => [...prev, newTodo]);//adding each task item to an array. It ensures the state is updated based on the previous value rather than overwriting it entirely.

        inputRef.current.value = "";//after adding clear the input field
    }

    const deleteTask = (id) => {
        setTaskAdd((prev) => {
            return prev.filter((t) => t.id !== id)
        });
    }


    const toogleTask = (id) => {
        setTaskAdd((prev) => {
            const updateTask = prev.map((t) => //iterating over the taskAdd array, transforming each task.Return a new array instead of modifying the existing one.
                t.id === id ? { ...t, isComplete: !t.isComplete } : t
            )
            //If the task's id matches the given id, it returns a new object with the same properties (...t), but flips the isComplete status
            //If the task doesn't match the given id, it's returned unchanged.

            updateTask.sort((a,b)=>Number(a.isComplete)-Number(b.isComplete));
            //then, sort tasks so completed ones move to the end

            return updateTask;
        })
    }

    // Save tasks to localStorage when tasks change
    useEffect(() => {
        //console.log(taskAdd);
        localStorage.setItem("tasklist", JSON.stringify(taskAdd));//since taskAdd is an array but we cannot store it .we can only store string
    }, [taskAdd]);

    return (
        <div className="todo">
            <h2>To-Do-List <img src={icon} alt="icon" /></h2>

            <div className="row">
                <input ref={inputRef} type="text" placeholder="Add your task" />
                <button onClick={addTask}>Add</button>
            </div>

            <div>
                {/* <TaskItem text="learn react"/>
                <TaskItem text="do coding daily"/>*/}
                {
                    taskAdd.map((task, index) => {
                        return <TaskItem key={index} text={task.text} id={task.id} isComplete={task.isComplete} del={deleteTask} toggle={toogleTask} />
                    })
                }
            </div>
        </div>
    );
}

export default ToDoApp;
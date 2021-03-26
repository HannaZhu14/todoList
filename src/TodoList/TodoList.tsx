import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterTaskType} from '../App';

export  type TodoListType = {
    title: string
    filter: FilterTaskType
    task: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterTaskType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function TodoList(props: TodoListType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else setError(true)

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {
            addTask();
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error ? <div className={'error-message'}>Title id required!</div> : false}
            </div>
            <ul>
                {props.task.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id)
                    }
                    return <li key={t.id} className={ t.isDone ? 'completed_task' : ''}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={ props.filter === 'all' ?'active-button' : '' }>All
                </button>
                <button onClick={onActiveClickHandler} className={ props.filter === 'active' ?'active-button' : '' }>Active
                </button>
                <button onClick={onCompletedClickHandler} className={ props.filter === 'completed' ?'active-button' : '' }>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;

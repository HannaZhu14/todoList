import React, {ChangeEvent} from 'react';
import {FilterTaskType} from '../App';
import AddItemForm from '../AddItemForm';
import {EditableSpan} from './EditableSpan';

type PropsType = {
    title: string
    todoListId: string
    task: Array<TaskType>
    filter: FilterTaskType
    removeTask: (id: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeFilter: (value: FilterTaskType, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function TodoList(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.todoListId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todoListId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.todoListId)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }


    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.task.map(t => {

                    const onClickHandler = () => {
                        props.removeTask(t.id, props.todoListId)
                    }
                    const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.todoListId)
                    }
                    const onChangeTitleStatus = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.todoListId)
                    }

                    return <li key={t.id} className={t.isDone ? 'completed_task' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeHandlerCheckbox}
                        />
                        <EditableSpan title={t.title} onChange={onChangeTitleStatus}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-button' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-button' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-button' : ''}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;


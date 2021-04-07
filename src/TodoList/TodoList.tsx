import React, {ChangeEvent} from 'react';
import {FilterTaskType} from '../App';
import AddItemForm from '../AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type PropsType = {
    title: string
    todoListId: string
    task: Array<TaskType>
    filter: FilterTaskType
    removeTodoList: (todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeFilter: (value: FilterTaskType, todoListID: string) => void
    onChangeTodoListTitle: (todoListId: string, newTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
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
    const onChangeTodoListTitle = (title: string) => {
        props.onChangeTodoListTitle(props.todoListId, title)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
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

                    return <div key={t.id} className={t.isDone ? 'completed_task' : ''}>
                        <Checkbox color={'primary'}
                               checked={t.isDone}
                               onChange={onChangeHandlerCheckbox}
                        />
                        <EditableSpan title={t.title} onChange={onChangeTitleStatus}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })}
            </div>
            <div>
                <Button onClick={onAllClickHandler}
                        variant={props.filter === 'all' ? 'contained' : 'text'}>All
                </Button>
                <Button onClick={onActiveClickHandler}
                        color={'primary'}
                        variant={props.filter === 'active' ? 'contained' : 'text'}>Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        color={'secondary'}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}>Completed
                </Button>
            </div>
        </div>
    );
}

export default TodoList;


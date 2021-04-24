import React, {ChangeEvent, useCallback} from 'react';
import AddItemForm from '../AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {FilterTaskType} from '../state/AppWithRedux';

type PropsType = {
    title: string
    todoListId: string
    task: Array<TaskType>
    filter: FilterTaskType
    removeTodoList: (todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeFilter: (todoListID: string,value: FilterTaskType ) => void
    onChangeTodoListTitle: (todoListId: string, newTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = React.memo((props: PropsType) => {

    console.log('TodoList is called')

    const onAllClickHandler = () => {
        props.changeFilter(props.todoListId, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todoListId, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todoListId, 'completed')
    }
    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [])

    const onChangeTodoListTitle = (title: string) => {
        props.onChangeTodoListTitle(props.todoListId, title)
    }


    let taskForTodoList = props.task
    if (props.filter === 'active') {
        taskForTodoList = props.task.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodoList = props.task.filter(t => t.isDone)
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
                {taskForTodoList.map(t => {

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
});

export default TodoList;


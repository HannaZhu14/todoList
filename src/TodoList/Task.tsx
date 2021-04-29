import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './TodoList';

type TaskPropsType = {
    todoListId: string
    removeTask: (id: string, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todoListId)
    }
    const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }
    const onChangeTitleStatus = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])

    return <div key={props.task.id} className={props.task.isDone ? 'completed_task' : ''}>
        <Checkbox color={'primary'}
                  checked={props.task.isDone}
                  onChange={onChangeHandlerCheckbox}
        />
        <EditableSpan title={props.task.title} onChange={onChangeTitleStatus}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
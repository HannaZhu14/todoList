import React, {useCallback} from 'react';
import AddItemForm from '../AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {FilterTaskType} from '../state/AppWithRedux';
import {Task} from './Task';

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

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todoListId, 'all')
    }, [props.changeFilter, props.todoListId]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todoListId, 'active')
    }, [props.changeFilter, props.todoListId]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todoListId, 'completed')
    }, [props.changeFilter, props.todoListId]);

    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const onChangeTodoListTitle = useCallback((title: string) => {
            props.onChangeTodoListTitle(props.todoListId, title)
        }, [props.onChangeTodoListTitle, props.todoListId]
    )

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
                {
                    taskForTodoList.map(task => <Task
                        key={task.id}
                        task={task}
                        changeTaskTitle={props.changeTaskTitle}
                        changeStatus={props.changeStatus}
                        removeTask={props.removeTask}
                        todoListId={props.todoListId}
                    />)
                }
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




import React, {useCallback} from 'react';

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './tasks-reducer';
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC,} from './todolist-reducer';
import TodoList, {TaskType} from '../TodoList/TodoList';
import AddItemForm from '../AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './store';

export type FilterTaskType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterTaskType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('AppWithRedux is called')
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    const removeTask = useCallback((id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todoListId)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((todoListID: string, value: FilterTaskType) => {
        const action = changeTodoListFilterAC(todoListID, value)
        dispatch(action)
    }, [dispatch])

    const onChangeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        const action = changeTodoListTitleAC(todoListId, newTitle)
        dispatch(action)
    }, [dispatch])


    const removeTodoList = useCallback((todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {

                        let taskForTodoList = tasks[tl.id]

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    todoListId={tl.id}
                                    filter={tl.filter}
                                    title={tl.title}
                                    task={taskForTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    onChangeTodoListTitle={onChangeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

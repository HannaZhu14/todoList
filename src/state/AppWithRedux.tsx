import React from 'react';

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './tasks-reducer';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from './todolist-reducer';
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

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatch(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todoListId)
        dispatch(action)
    }

    function changeFilter(todoListID: string, value: FilterTaskType) {
        const action = changeTodoListFilterAC(todoListID, value)
        dispatch(action)
    }

    function onChangeTodoListTitle(todoListId: string, newTitle: string) {
        const action = changeTodoListTitleAC(todoListId, newTitle)
        dispatch(action)
    }


    function removeTodoList(todoListId: string) {
        const action = removeTodoListAC(todoListId)
        dispatch(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatch(action)
    }

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
                        if (tl.filter === 'active') {
                            taskForTodoList = taskForTodoList.filter(t => !t.isDone)
                        }
                        if (tl.filter === 'completed') {
                            taskForTodoList = taskForTodoList.filter(t => t.isDone)
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={tl.id}
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

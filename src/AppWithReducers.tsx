import React, {useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList/TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';


export type FilterTaskType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterTaskType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    const todoListId1 = v1();
    const todoListId2 = v1();


    let [todoLists, dispatchToTodoListsReducer] = useReducer(todolistsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'active'},
    ])
    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'graphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Sugar', isDone: false},
        ],
    })


    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId)
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeFilter(todoListID: string, value: FilterTaskType) {
        const action = changeTodoListFilterAC(todoListID, value)
        dispatchToTodoListsReducer(action)
    }

    function onChangeTodoListTitle(todoListId: string, newTitle: string) {
        const action = changeTodoListTitleAC(todoListId, newTitle)
        dispatchToTodoListsReducer(action)
    }


    function removeTodoList(todoListId: string) {
        const action = removeTodoListAC(todoListId)
        dispatchToTasksReducer(action)
        dispatchToTodoListsReducer(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodoListsReducer(action)
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

                        let taskForTodoList = tasksObj[tl.id]
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

export default AppWithReducers;

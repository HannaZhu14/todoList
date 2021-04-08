import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList/TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';


export type FilterTaskType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterTaskType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'active'},
    ])
    let [tasksObj, setTasks] = useState<TasksStateType>({
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
        let tasks = tasksObj[todoListId];
        tasksObj[todoListId] = tasks.filter(t => t.id !== id)
        setTasks({...tasksObj})
    }

    function addTask(title: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let newTask = {id: v1(), title: title, isDone: false}
        tasksObj[todoListId] = [newTask, ...tasks]
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterTaskType, todoListID: string) {
        let todolist = todoLists.find(tl => tl.id === todoListID)
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function onChangeTodoListTitle(todoListId: string, newTitle: string) {
        const todolist = todoLists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todoLists])
        }
    }


    function removeTodoList(todoListId: string) {
        let filteredTL = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTL)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    function addTodoList(title: string) {
        const todolist: TodoListType = {
            id: v1(),
            title,
            filter: 'all'
        }
        setTodoLists([todolist, ...todoLists])
        setTasks({...tasksObj, [todolist.id]: []})
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

export default App;

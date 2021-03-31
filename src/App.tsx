import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList/TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';

export type FilterTaskType = 'all' | 'active' | 'completed';
type TodoListType = {
    id: string
    title: string
    filter: FilterTaskType
}
type TodoListsType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'active'},
    ])
    let [tasksObj, setTasks] = useState<TodoListsType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Rest api', isDone: false},
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

            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(tl => {

                let taskForTodoList = tasksObj[tl.id];
                if (tl.filter === 'active') {
                    taskForTodoList = taskForTodoList.filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    taskForTodoList = taskForTodoList.filter(t => t.isDone)
                }

                return <TodoList
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
                />
            })}
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList/TodoList';
import {v1} from 'uuid';

export type FilterTaskType = 'all' | 'active' | 'completed'

function App() {
    const [task, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Rest api', isDone: false},
        {id: v1(), title: 'graphQL', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterTaskType>('all');
    let taskForTodoList = task;

    if (filter === 'active') {
        taskForTodoList = task.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        taskForTodoList = task.filter(t => t.isDone)
    }

    function removeTask(id: string) {
        let filterTasks = task.filter(t => t.id !== id);
        setTask(filterTasks)
    }
    function addTask (title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask,...task]
        setTask(newTasks)
    }
    function changeFilter(value: FilterTaskType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={'What to learn'}
                task={taskForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;


import {v1} from 'uuid';
import {addTodoListType, removeTodoListType} from './todolist-reducer';
import {TasksStateType} from './AppWithRedux';

type ActionType = removeTaskAC | addTaskAC | changeTaskStatusAC | changeTaskTitleAC | addTodoListType | removeTodoListType
type removeTaskAC = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type addTaskAC = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type changeTaskStatusAC = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistId: string
}
type changeTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    newTitle: string
    todolistId: string
}

const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistsTasks = state[action.todolistId]
            state[action.todolistId] = todolistsTasks
                .map(t => t.id === action.taskID
                    ? {...t, isDone: action.isDone}
                    : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                        if (t.id === action.taskID) {
                            return {...t, title: action.newTitle}
                        } else {
                            return t
                        }
                    }
                )
            }
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskAC => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}

export const addTaskAC = (title: string, todolistId: string): addTaskAC => {
    return {type: 'ADD-TASK', todolistId, title} as const
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string): changeTaskStatusAC => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistId} as const
}

export const changeTaskTitleAC = (taskID: string, newTitle: string, todolistId: string): changeTaskTitleAC => {
    return {type: 'CHANGE-TASK-TITLE', taskID, newTitle, todolistId} as const
}


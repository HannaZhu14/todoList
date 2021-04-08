import {FilterTaskType, TodoListType} from '../App';
import {v1} from 'uuid';

type ActionType = removeTodoListType | addTodoListType | changeTodoListTitleType | changeTodoListFilterType
type removeTodoListType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type addTodoListType = {
    type: 'ADD-TODOLIST',
    title: string
}
type changeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
type changeTodoListFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterTaskType
}

export const todolistReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            let todolist: TodoListType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, todolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title;
                return [...state]
            }
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist && action.type === 'CHANGE-TODOLIST-FILTER') {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTodoListAC = (id: string): removeTodoListType => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}

export const addTodoListAC = (title: string): addTodoListType => {
    return {
        type: 'ADD-TODOLIST',
        title
    } as const
}

export const changeTodoListTitleAC = (id: string, title: string): changeTodoListTitleType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    } as const
}

export const changeTodoListFilterAC = (id: string, filter: FilterTaskType): changeTodoListFilterType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    } as const
}
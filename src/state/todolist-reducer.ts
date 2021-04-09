import {FilterTaskType, TodoListType} from '../App';
import {v1} from 'uuid';

type ActionType = removeTodoListType | addTodoListType | changeTodoListTitleType | changeTodoListFilterType
export type removeTodoListType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type addTodoListType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
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

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: Array<TodoListType> = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'active'},
]

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            let todolist: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [todolist, ...state]
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
            return state;
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
        title,
        todolistId: v1()
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
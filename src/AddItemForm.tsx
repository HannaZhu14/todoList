import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import { PlaylistAddRounded} from '@material-ui/icons';


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<boolean | string>(false)
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else setError('Title is required')

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (

        <div>
            <TextField
                variant={'outlined'}
                label={'Type value'}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask}
                // variant={'contained'}
                color={'primary'}
            ><PlaylistAddRounded fontSize={'large'}
                                 color={'primary'}
            /></IconButton>
        </div>

    );
}

export default AddItemForm;

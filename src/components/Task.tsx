
import React, { Dispatch, SetStateAction } from 'react';
import { Task as TaskType, User } from '../types';
import { IconButton, Paper, Popover, Typography } from '@mui/material';
import {  EditNote,  } from '@mui/icons-material';
import TaskEditForm from './TaskEditForm';



const CaretakerComponent: React.FC<{ caretaker: User }> = ({ caretaker }) => {
    return (

        <div style={{ padding: "1px" }}>
            <Paper variant="outlined" style={{ backgroundColor: caretaker.color || "lightgrey", padding: "0px 12px" }}>
                <Typography>{caretaker.name}</Typography>
            </Paper>
        </div>
    )
}
interface FormData {
    taskTitle: string,
    sizeEstimate?: string,
    corners?: User[],
    description?: string,
    color?: string,
}

const EditTaskButton: React.FC<{ task: TaskType, setTaskSelected: Dispatch<SetStateAction<boolean>> }> = ({ task, setTaskSelected }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTaskSelected(true)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setTaskSelected(false)
        setAnchorEl(null);
    };

    const handleOnSubmit = (data: FormData) => {
        console.log(data)
        setTaskSelected(false)
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;

    return (
        <div>
            <IconButton size="small" onClick={handleClick}>
                <EditNote />
            </IconButton>
            <Popover
            disableRestoreFocus
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 100,
                    horizontal: -50,
                }}
            >
                <Paper style={{ height: "fit-content", padding: "20px", width: "400px" }}>
                    <TaskEditForm onSubmit={handleOnSubmit} onCancel={handleClose} task={task} />

                </Paper>
            </Popover>
        </div>

    )
}


interface TaskProps {
    task: TaskType
    index: number
}

const Task: React.FC<TaskProps> = ({ task }) => {

    const [selected, setSelected] = React.useState(false);

    const taskStyle = {
        padding: "4px",
        backgroundColor: task.color,
        height: "100px",
        marginBottom: "5px",
    }

    //temporary styling solutions
    return (
        <Paper elevation={selected ? 24 : 4} style={taskStyle} >

            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <Typography variant={'h6'} gutterBottom noWrap>{task.title}</Typography>
                <EditTaskButton task={task} setTaskSelected={setSelected} />
            </div>


            <div style={{ display: 'flex', height: "60%", justifyContent: 'space-between' }}>
                <div style={{ overflow: "hidden" }}>
                    {task.caretakers && task.caretakers.map((caretaker, index) => (
                        <CaretakerComponent key={index} caretaker={caretaker} />
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>{task.sizeEstimate}</Typography>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default Task;

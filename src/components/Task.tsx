
import React from 'react';
import { Task as TaskType } from '../types';
import { Paper } from '@mui/material';

interface TaskProps {
    task: TaskType
    index: number
}

const Task: React.FC<TaskProps> = ({task}) => {
    return (
        <Paper elevation={2} style={{ backgroundColor: task.color }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </Paper>
    );
};

export default Task;

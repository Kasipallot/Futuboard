import { Box, Dialog, DialogContent, IconButton, Typography } from "@mui/material"
import { Column, Task as TaskType } from "../types"
import Paper from '@mui/material/Paper'
import Task from "./Task"
import AddIcon from '@mui/icons-material/Add';
import {useState} from 'react'
import TaskCreationForm from "./TaskCreationForm";

interface FormData {
  taskTitle: string,
  sizeEstimate?: number,
  corners?: string[],
  description?: string,
}

const CreateTaskButton:React.FC = () => {
  const [open, setOpen] = useState(false)

    const handleOpenDialog = () => {
      setOpen(true)
  }
  const handleCloseDialog = () => {
      setOpen(false)
  }
  const handleSubmit = (data: FormData) => {
    //data holds the task object. send to server. log for now
    console.log(data)
    setOpen(false)

  }
  return(
    <Box>
      <IconButton color="primary" aria-label="add task" onClick = {handleOpenDialog}>
            <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleCloseDialog}>
              <DialogContent>
                  <TaskCreationForm onSubmit = {handleSubmit} onCancel = {handleCloseDialog}/>
              </DialogContent>
        </Dialog>
    </Box>
    
  )
}


interface TaskListProps {
  column : Column
}


const TaskList: React.FC<TaskListProps> = ({ column }) => {

  const tasks = column.tasks
  return (
    <div>
      {tasks && tasks.length ? (
        tasks.map((task: TaskType, index) => (
          <Task
            key={task.id}
            task={task}
            index = {index}
          />
        ))
      ) : (
        <Typography><b>no tasks yet</b></Typography>
      )}
    </div>
  )
}



interface ColumnProps {
  column : Column,
  index : number
}

const Column: React.FC<ColumnProps> = ({ column }) => {

  return (
    <>
      <Paper elevation={4} style={{ margin: '25px', width: '250px', height: '1000px', backgroundColor: '#E5DBD9', padding: '4px'}}>
        <Typography  variant={'h5'}  gutterBottom>{column.title}</Typography>
        <CreateTaskButton />
        <TaskList column={column} />
      </Paper>
    </>
  );
};

export default Column
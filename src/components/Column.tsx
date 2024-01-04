import { Box, Dialog, DialogContent, IconButton, List, Popover, Typography } from "@mui/material"
import { Draggable, Droppable, DroppableProvided } from '@hello-pangea/dnd';
import { useGetTaskListByColumnIdQuery } from "../state/apiSlice";
import { Column, Task as TaskType, User } from "../types"
import Paper from '@mui/material/Paper'
import Task from "./Task"
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react'
import TaskCreationForm from "./TaskCreationForm";
import { getId } from "../services/Utils";
import { Edit } from "@mui/icons-material";
import ColumnEditForm from "./ColumnEditForm";
import { useParams } from "react-router";

interface FormData {
  taskTitle: string,
  sizeEstimate?: string,
  corners?: User[],
  description?: string,
}

const CreateTaskButton: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => {
    setOpen(true)
  }
  const handleCloseDialog = () => {
    setOpen(false)
  }
  const handleSubmit = (data: FormData) => {
    //data holds the task object. send to server. log for now
    //task object cant be give type Task yet- problem with caretaker types
    const taskObject = {
      id: getId(),
      title: data.taskTitle,
      description: data.description,
      caretakers: data.corners,
      sizeEstimate: data.sizeEstimate,
    }
    console.log(taskObject)
    setOpen(false)

  }
  return (
    <Box>
      <IconButton color="primary" aria-label="add task" onClick={handleOpenDialog}>
        <AddIcon />
      </IconButton>
      <Dialog disableRestoreFocus open={open} onClose={handleCloseDialog} PaperProps={{
        style: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

        },
      }}
      >
        <DialogContent>
          <TaskCreationForm onSubmit={handleSubmit} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>

  )
}


interface TaskListProps {
  column: Column,
}


const TaskList: React.FC<TaskListProps> = ({ column }) => {

  const { id } = useParams()
  //bad code fix later
  if (!id) {
    return
  }

  //change to get task data of columnId from server, only give prop for columnId
  const { data: taskList } = useGetTaskListByColumnIdQuery({ boardId: id, columnId: column.columnid });

  const tasks = taskList

  return (
    <Droppable droppableId={column.columnid} type="task">
      {(provided: DroppableProvided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks && tasks.length ? (
              tasks.map((task: TaskType, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => {
                    return (
                      <List
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}

                      >
                        <Task
                          key={task.id}
                          task={task}
                          index={index}
                        />
                      </List>
                    );
                  }}
                </Draggable>
              ))
            ) : (
              <Typography variant={'body2'} gutterBottom>
                No tasks yet
              </Typography>
            )}
            {provided.placeholder}
          </div>
        );
      }

      }
    </Droppable>
  )
}



const EditColumnButton: React.FC<{ column: Column }> = ({ column }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {

    setAnchorEl(null);
  };

  const handleOnSubmit = () => {
    // get data send put request
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;

  return (
    <div>
      <IconButton size="small" onClick={handleClick}>
        <Edit />
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
          vertical: 50,
          horizontal: -20,
        }}
      >
        <Paper style={{ height: "fit-content", padding: "20px", width: "200px" }}>
          <ColumnEditForm onSubmit={handleOnSubmit} onCancel={handleClose} column={column} />
        </Paper>
      </Popover>
    </div>
  )
}


interface ColumnProps {
  column: Column,
  index: number
}

const Column: React.FC<ColumnProps> = ({ column }) => {

  return (
    <>
      <Paper elevation={4} style={{ margin: '25px 20px', width: '250px', height: '1000px', backgroundColor: '#E5DBD9', padding: '4px' }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant={'h5'} gutterBottom>{column.title}</Typography>
          <EditColumnButton column={column} />

        </div>
        <CreateTaskButton />
        <TaskList column={column} />
      </Paper>
    </>
  );
};

export default Column
import { Draggable, Droppable, DroppableProvided, DroppableStateSnapshot } from "@hello-pangea/dnd";
import { Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Box, Dialog, DialogContent, IconButton, List, Popover, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useParams } from "react-router";

import { getId } from "../../services/Utils";
import { useAddTaskMutation, useGetTaskListByColumnIdQuery, useUpdateColumnMutation } from "../../state/apiSlice";
import { Column, Task as TaskType, User } from "../../types";

import ColumnEditForm from "./ColumnEditForm";
import Task from "./Task";
import TaskCreationForm from "./TaskCreationForm";

interface FormData {
  taskTitle: string,
  size?: string,
  corners?: User[],
  description?: string,
}

interface CreateTaskButtonProps {
  columnid: string
}

const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({ columnid }) => {
  const { id = "default-id" } = useParams();

  const [addTask] = useAddTaskMutation();

  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleSubmit = (data: FormData) => {
    //task object cant be give type Task yet- problem with caretaker types
    //the object creation should be refactored to the TaskCreationForm component
    const taskObject = {
      ticketid: getId(),
      title: data.taskTitle,
      description: data.description,
      caretakers: data.corners,
      size: data.size,
      columnid: columnid,
      boardid: id,
    };

    const add$ = addTask({ boardId: id, columnId : columnid, task: taskObject });
    add$.unwrap().then(() => {
      setOpen(false);
    }).catch((error) => {
      console.error(error);
    });
    setOpen(false);

  };
  return (
    <Box>
      <IconButton color="primary" aria-label="add task" onClick={handleOpenDialog}>
        <AddIcon />
      </IconButton>
      <Dialog disableRestoreFocus open={open} onClose={handleCloseDialog} PaperProps={{
        style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      >
        <DialogContent>
          <TaskCreationForm onSubmit={handleSubmit} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>

  );
};

interface TaskListProps {
  column: Column;
}

const TaskList: React.FC<TaskListProps> = ({ column }) => {

  //get task list from server
  const { data: taskList, isLoading } = useGetTaskListByColumnIdQuery({ boardId: column.boardid, columnId: column.columnid });

  const tasks = taskList;
  if (isLoading) {
    return (
      <Typography variant={"body2"} gutterBottom>
        Loading tasks...
      </Typography>
    );
  }

  return (
    <Droppable droppableId={column.columnid} type="task">
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
        return (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "lightblue" : "transparent",
             }}
            {...provided.droppableProps}
          >
            {tasks && tasks.length ? (
              tasks.map((task: TaskType, index) => (
                <Draggable key={task.ticketid} draggableId={task.ticketid} index={index}>
                  {(provided) => {
                    return (
                      <List
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}

                      >
                        <Task
                          key={task.ticketid}
                          task={task}
                          index={index}
                        />
                      </List>
                    );
                  }}
                </Draggable>
              ))
            ) : (
              <Typography variant={"body2"} gutterBottom>
                No tasks yet
              </Typography>
            )}
            {provided.placeholder}
          </div>
        );
      }

      }
    </Droppable>
  );
};

interface ColumnFormData {
  columnTitle: string,
}

const EditColumnButton: React.FC<{ column: Column }> = ({ column }) => {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [updateColumn] = useUpdateColumnMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnSubmit = (data : ColumnFormData) => {
    const columnObject = {
      columnid: column.columnid,
      title: data.columnTitle,
      boardid: column.boardid
    };

    updateColumn({ column: columnObject });
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popOverid = open ? "popover" : undefined;

  return (
    <div>
      <IconButton size="small" onClick={handleClick}>
        <Edit />
      </IconButton>
      <Popover
        disableRestoreFocus
        id={popOverid}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: 50,
          horizontal: -20,
        }}
      >
        <Paper sx={{ height: "fit-content", padding: "20px", width: "200px" }}>
          <ColumnEditForm onSubmit={handleOnSubmit} onCancel={handleClose} column={column} />
        </Paper>
      </Popover>
    </div>
  );
};

interface ColumnProps {
  column: Column;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ column }) => {

  return (
    <>
      <Paper elevation={4} sx={{ margin: "25px 20px", width: "250px", height: "1000px", backgroundColor: "#E5DBD9", padding: "4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant={"h5"} gutterBottom>{column.title}</Typography>
          <EditColumnButton column={column} />

        </div>
        <CreateTaskButton columnid={column.columnid}/>
        <TaskList column={column} />
      </Paper>
    </>
  );
};

export default Column;
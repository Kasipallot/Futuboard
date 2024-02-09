import { Draggable, DraggableStateSnapshot, DraggableStyle, Droppable, DroppableProvided, DroppableStateSnapshot } from "@hello-pangea/dnd";
import { EditNote, } from "@mui/icons-material";
import { IconButton, Paper, Popover, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState, useContext } from "react";
import { useGetUsersByTicketIdQuery, useUpdateTaskMutation } from "../../state/apiSlice";
import { Task as TaskType, User } from "../../types";
import { WebsocketContext } from "@/pages/BoardContainer";
import TaskEditForm from "./TaskEditForm";
import UserMagnet from "./UserMagnet";

const CaretakerComponent: React.FC<{ caretaker: User }> = ({ caretaker }) => {
    return (
        <div>
            <Paper variant="outlined" sx={{ backgroundColor: caretaker.color || "lightgrey", padding: "0px 12px" }}>
                <Typography>{caretaker.name}</Typography>
            </Paper>
        </div>
    );
};

const dropStyle = (style: DraggableStyle | undefined, snapshot: DraggableStateSnapshot) =>  {
    if (!snapshot.isDropAnimating) {
      return style;
    }

    return {
      ...style,
      transform: "scale(0)",
      transition: `all  ${0.01}s`,
    };
  };

const UserMagnetList: React.FC<{ users : User[] }> = ({ users }) => {

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {users.map((user, index) => (
                <Draggable key={user.userid} draggableId={user.userid} index={index}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={dropStyle(provided.draggableProps.style, snapshot)}
                            >
                                <UserMagnet user={user} editable={false}/>
                            </div>
                        );
                    }
                    }
                </Draggable>
            ))}
        </div>
    );
};

interface FormData {
    taskTitle: string,
    size?: number,
    corners?: User[],
    description?: string,
    color?: string,
}

const EditTaskButton: React.FC<{ task: TaskType, setTaskSelected: Dispatch<SetStateAction<boolean>> }> = ({ task, setTaskSelected }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [updateTask] = useUpdateTaskMutation();
    const sendMessage = useContext(WebsocketContext)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTaskSelected(true);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setTaskSelected(false);
        setAnchorEl(null);
    };

    const handleOnSubmit = async (data: FormData) => {
        const taskObject = {
            ticketid: task.ticketid,
            title: data.taskTitle,
            description: data.description,
            caretakers: data.corners,
            size: data.size,
            color: data.color,
            columnid: task.columnid,
        };

        await updateTask({ task: taskObject });
        if (sendMessage !== null) {
            sendMessage("Task updated");
        }
        
        setTaskSelected(false);
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popOverid = open ? "popover" : undefined;

    return (
        <div>
            <IconButton size="small" onClick={handleClick}>
                <EditNote />
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
                    vertical: 100,
                    horizontal: -50,
                }}
            >
                <Paper sx={{ height: "fit-content", padding: "20px", width: "400px" }}>
                    <TaskEditForm onSubmit={handleOnSubmit} onCancel={handleClose} task={task} />

                </Paper>
            </Popover>
        </div>

    );
};

interface TaskProps {
    task: TaskType
    index: number
}

const Task: React.FC<TaskProps> = ({ task }) => {

    const { data : users } = useGetUsersByTicketIdQuery(task.ticketid);

    const [selected, setSelected] = useState(false);

    //temporary styling solutions
    return (
        <Droppable droppableId={task.ticketid} type="user"  direction="vertical" >
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                return (
                    <div ref={provided.innerRef}>
                        <Paper elevation={selected ? 24 : 4} sx={{
                            padding: "4px",
                            backgroundColor: snapshot.isDraggingOver ? "lightblue" : task.color,
                            height: "100px",
                            marginBottom: "5px",
                        }}  >
                            <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", overflow: "hidden" }}>
                                    <div style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 3,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        width: "85%"
                                    }}>
                                        <Typography variant={"body2"} gutterBottom>{task.title}</Typography>
                                    </div>
                                    <div>
                                        <EditTaskButton task={task} setTaskSelected={setSelected} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ overflow: "hidden" }}>
                                        {task.caretakers && task.caretakers.map((caretaker, index) => (
                                            <CaretakerComponent key={index} caretaker={caretaker} />
                                        ))}
                                    </div>
                                    <div style={{ overflow:"hidden", width:"90%" }}>
                                        {users && <UserMagnetList users={users}/>}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                        <div>
                                            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>{task.size}</Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {provided.placeholder}
                        </Paper>
                    </div>
                );

            }}

        </Droppable>
    );
};

export default Task;
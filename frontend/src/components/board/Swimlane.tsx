import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Add } from "@mui/icons-material";
import { Box, IconButton, Paper, Popover, Typography } from "@mui/material";
import { useContext, useState } from "react";

import { WebsocketContext } from "@/pages/BoardContainer";
import { getId } from "@/services/Utils";
import { useGetActionListByTaskIdAndSwimlaneColumnIdQuery, usePostActionMutation } from "@/state/apiSlice";
import { Action, SwimlaneColumn, Task } from "@/types";

import ActionCreationForm from "./ActionCreationForm";

interface SwimlaneActionListProps {
    taskId: string,
    swimlanecolumnid: string
}

const SwimlaneActionList: React.FC<SwimlaneActionListProps> = ({ taskId, swimlanecolumnid }) => {

    const { data: actionList } = useGetActionListByTaskIdAndSwimlaneColumnIdQuery({ taskId, swimlaneColumnId: swimlanecolumnid });

    return (
        <>
            <Droppable droppableId={swimlanecolumnid +"/"+taskId} type={"SWIMLANE" + "-" + taskId}>
                {(provided) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ display: "flex", flexDirection: "column", flex: "1", padding: "8px", alignContent: "center", borderLeft: "2px solid white", height:"112px", overflow:"auto" }}>
                        {actionList && actionList.map((action, index) => (
                            <Draggable key={action.actionid} draggableId={action.actionid} index={index}>
                                {(provided) => (
                                    <Box boxShadow={1} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ backgroundColor: "white", padding: "2px", marginBottom: "2px", borderRadius: "4px" }}>
                                        <Typography variant={"body1"} fontSize={12} noWrap>{action.title}</Typography>
                                    </Box>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>

        </>
    );
};

const CreateActionButton: React.FC<{ taskId: string, swimlanecolumnid: string }> = ({ taskId, swimlanecolumnid }) => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [createAction] = usePostActionMutation();

    const sendMessage = useContext(WebsocketContext);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleOnSubmit = async (data: {actionTitle: string}) => {
      const actionObject:Action = {
        title: data.actionTitle,
        actionid : getId(),
        color:"white",
      };

      await createAction({ taskId, swimlaneColumnId: swimlanecolumnid, action: actionObject });

      if (sendMessage !== null) {
        sendMessage("Action created");
      }
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popOverid = open ? "popover" : undefined;

    return (
      <div>
        <IconButton size={"small"} onClick={handleClick}>
                <Add  sx={{ fontSize: "15px" }}/>
        </IconButton>
        <Popover
          disableRestoreFocus
          id={popOverid}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: 10,
            horizontal: 230,
          }}
        >
          <Paper sx={{ height: "fit-content", padding: "20px", width: "200px" }}>
            <ActionCreationForm onSubmit={handleOnSubmit} onCancel={handleClose}  />
          </Paper>
        </Popover>
      </div>
    );
  };

interface SwimlaneProps {
    task: Task,
    swimlaneColumns: SwimlaneColumn[]
}

const Swimlane: React.FC<SwimlaneProps> = ({ task, swimlaneColumns }) => {

    return (
        <div style={{ display: "flex" }}>
            {swimlaneColumns && <CreateActionButton taskId={task.ticketid} swimlanecolumnid={swimlaneColumns[0].swimlanecolumnid}/>}
            <Box sx={{ height: "127px", width: "100%", backgroundColor: "#E5DBD9", borderBottom: "1px solid white", borderTop: "1px solid white" }}>
                <Box sx={{ display: "flex" }}>
                    {swimlaneColumns && swimlaneColumns.map((swimlaneColumn, index) => (
                        <SwimlaneActionList key={index} taskId={task.ticketid} swimlanecolumnid={swimlaneColumn.swimlanecolumnid} />
                    ))}

                </Box>
            </Box>
        </div>

    );
};

export default Swimlane;
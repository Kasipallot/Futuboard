import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Add } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import { Task } from "@/types";

interface SwimlaneActionListProps {
    taskId: string,
    swimlaneColumnId: string
}

const SwimlaneActionList: React.FC<SwimlaneActionListProps> = ({ taskId, swimlaneColumnId }) => {
    // const {data: actionList} = useGetActionListByTaskIdAndSwimlaneColumnIdQuery({taskId, SwimlaneColumnId});
    const mockActionList = [{ actionid: "1", title: "Action 1" }, { actionid: "2", title: "Action 2" }, { actionid: "3", title: "Action 3" }];

    return (
        <>
            <Droppable droppableId={"actionList" + "-" + swimlaneColumnId + taskId} type={"SWIMLANE" + "-" + taskId}>
                {(provided) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ display: "flex", flexDirection: "column", flex: "1", padding: "8px" }}>
                        {mockActionList && mockActionList.map((action, index) => (
                            <Draggable key={action.actionid} draggableId={taskId + swimlaneColumnId + action.title} index={index}>
                                {(provided) => (
                                    <Box boxShadow={8} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ backgroundColor: "white", padding: "2px", marginBottom: "2px", borderRadius: "4px" }}>
                                        <Typography variant={"body2"} noWrap>{action.title}</Typography>
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

interface SwimlaneProps {
    task: Task,
    swimlaneColumns: { columnid: string, title: string }[]
}

const Swimlane: React.FC<SwimlaneProps> = ({ task, swimlaneColumns }) => {

    return (
        <div style={{ display: "flex" }}>
            <IconButton size={"small"}>
                <Add  sx={{ fontSize: "15px" }}/>
            </IconButton>
            <Box sx={{ height: "127px", width: "100%", backgroundColor: "#E5DBD9", borderBottom: "1px solid white", borderTop: "1px solid white" }}>
                <Box sx={{ display: "flex" }}>
                    {swimlaneColumns && swimlaneColumns.map((swimlaneColumn, index) => (
                        <SwimlaneActionList key={index} taskId={task.ticketid} swimlaneColumnId={swimlaneColumn.columnid} />
                    ))}

                </Box>
            </Box>
        </div>

    );
};

export default Swimlane;
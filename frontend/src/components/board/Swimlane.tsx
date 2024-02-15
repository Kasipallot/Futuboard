import { Add } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import { Task } from "@/types";

interface SwimlaneActionListProps {
    taskId: string,
    swimlaneColumnId: string
}

const SwimlaneActionList:React.FC<SwimlaneActionListProps> = () => {
    // const {data: actionList} = useGetActionListByTaskIdAndSwimlaneColumnIdQuery({taskId, SwimlaneColumnId});

    return(
        <></>
    );
};

interface SwimlaneProps {
    task: Task,
    swimlaneColumns: { columnid: string, title: string }[]
}

const Swimlane:React.FC<SwimlaneProps> = ({ task, swimlaneColumns }) => {

    return (
        <Box sx={{ height: "127px", width:"100%", backgroundColor: "#E5DBD9", borderBottom: "1px solid white", borderTop:"1px solid white" }}>
            <Typography variant={"h6"} noWrap gutterBottom>{task.title}</Typography>
            <IconButton>
                <Add />
            </IconButton>
            <Box sx={{ display:"flex" }}>
                {swimlaneColumns && swimlaneColumns.map((swimlaneColumn, index) => (
                    <SwimlaneActionList key={index} taskId={task.ticketid} swimlaneColumnId={swimlaneColumn.columnid} />
                ))}

            </Box>
        </Box>
    );
};

export default Swimlane;
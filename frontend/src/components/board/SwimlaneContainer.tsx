import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

import { useGetTaskListByColumnIdQuery } from "@/state/apiSlice";
import { Column } from "@/types";

import Swimlane from "./Swimlane";

interface SwimlaneContainerProps {
    column: Column
}

const SwimlaneContainer:React.FC<SwimlaneContainerProps> = ({ column }) => {

    const { data: taskList } = useGetTaskListByColumnIdQuery({ boardId: column.boardid, columnId: column.columnid });
    //const swimlaneColumns = useGetSwimlaneColumnsByColumnIdQuery(column.columnid);
    const swimlaneColumns = [{ columnid: "1", title: "To Do" }, { columnid: "2", title: "In Progress" }, { columnid:"3", title:"something" }, { columnid: "4", title: "Done" }]; //comment out when backend is ready

    const tasks = taskList;

    return (
        <Paper elevation={4} sx={{ margin: "25px 0px", width: "800px", minHeight: "1000px", height: "fit-content", backgroundColor: "#E5DBD9", padding: "4px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "30px", padding:"5px 50px" }}>
                {swimlaneColumns.map((swimlaneColumn, index) => (
                    <Typography key={index} variant={"h5"} noWrap gutterBottom>{swimlaneColumn.title}</Typography>
                ))}
            </Box>
            {tasks && tasks.length ? (
                tasks.map((task) => (
                    <Swimlane task={task} swimlaneColumns={swimlaneColumns}/>
                )
                )
            ) : (
                <div>
                    No tasks
                </div>
            )}
        </Paper>
    );
};

export default SwimlaneContainer;
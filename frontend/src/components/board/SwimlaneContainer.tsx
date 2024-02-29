import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";

import { useGetSwimlaneColumnsByColumnIdQuery, useGetTaskListByColumnIdQuery, useUpdateSwimlaneColumnMutation } from "@/state/apiSlice";
import { Column, SwimlaneColumn } from "@/types";

import Swimlane from "./Swimlane";

const SwimlaneColumnTitleComponent: React.FC<{ swimlanecolumn: SwimlaneColumn }> = ({ swimlanecolumn }) => {

    const [updateSwimlaneColumn] = useUpdateSwimlaneColumnMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(swimlanecolumn.title);

    const handleDoubleClick = () => {
      setIsEditing(true);
    };

    const handleBlur = async () => {
      setIsEditing(false);
      if (currentTitle === swimlanecolumn.title) {
        return;
      }
      const updatedSwimlaneColumn = { ...swimlanecolumn, title: currentTitle };
        await updateSwimlaneColumn({ swimlaneColumn: updatedSwimlaneColumn });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleBlur();
        }
    };

    return (
        isEditing ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <input
                  autoFocus
                  value={currentTitle}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: "100%", fontSize: "1.5rem", backgroundColor: "transparent" }}
                />
            </Box>
          ) : (
            <Typography variant={"h5"} noWrap gutterBottom onDoubleClick={handleDoubleClick}>
              {currentTitle}
            </Typography>
          )
    );
  };

interface SwimlaneContainerProps {
    column: Column
}

const SwimlaneContainer:React.FC<SwimlaneContainerProps> = ({ column }) => {

    const { data: taskList } = useGetTaskListByColumnIdQuery({ boardId: column.boardid, columnId: column.columnid });
    const { data: swimlaneColumns, isSuccess } = useGetSwimlaneColumnsByColumnIdQuery(column.columnid);

    const tasks = taskList;

    return (
        <Paper elevation={4} sx={{ margin: "25px 0px", width: "800px", minHeight: "1000px", backgroundColor: "#E5DBD9", padding: "4px" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "30px", padding:"5px 10px", paddingLeft:"30px" }}>
                {swimlaneColumns && swimlaneColumns.map((swimlaneColumn) => (
                    <Box key={swimlaneColumn.swimlanecolumnid} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: "0", display: "flex", justifyContent: "center", alignItems: "center", overflow:"hidden" }}>
                        <SwimlaneColumnTitleComponent swimlanecolumn={swimlaneColumn}/>
                    </Box>
                ))}
            </Box>
            {tasks && isSuccess && tasks.length ? (
                tasks.map((task) => (
                    <Swimlane key={task.ticketid} task={task} swimlaneColumns={swimlaneColumns}/>
                ))
            ) : (
                <div>
                    No Cards
                </div>
            )}
        </Paper>
    );
};

export default SwimlaneContainer;
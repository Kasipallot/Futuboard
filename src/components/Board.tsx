import { DragDropContext } from "@hello-pangea/dnd";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";

import { useGetColumnsByBoardIdQuery } from "../state/apiSlice";

import Column from "./Column"


const Board: React.FC = () => {
    const { id = "default-id" } = useParams()

    const { data: columns, isLoading, isSuccess } = useGetColumnsByBoardIdQuery(id)

    const handleOnDragEnd = () => {
        //TODO: change the order of task in source and destination columns
        //then update the columns in the database
    }

    if (isLoading) {
        return <Typography>Loading columns...</Typography>
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Box sx={{ display: "inline-flex", height: "100vh", width: "fit-content", margin: "25px" }} >
                {isSuccess && columns.map((column, index) => (
                    <Column key={column.columnid} column={column} index={index} />
                ))}
            </Box>
        </DragDropContext>

    );
};

export default Board
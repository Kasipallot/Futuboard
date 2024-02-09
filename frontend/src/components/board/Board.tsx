import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";

import {  useGetColumnsByBoardIdQuery } from "../../state/apiSlice";

import Column from "./Column";

const Board: React.FC = () => {
    const { id = "default-id" } = useParams();

    const { data: columns, isLoading, isSuccess } = useGetColumnsByBoardIdQuery(id);

    if (isLoading) {
        return <Typography>Loading columns...</Typography>;
    }

    return (
            <Box sx={{ display: "inline-flex", height: "100vh", width: "fit-content", margin: "4rem 25px 25px 25px" }} >
                {isSuccess && columns.map((column, index) => (
                    <Column key={column.columnid} column={column} index={index} />
                ))}
            </Box>
    );
};

export default Board;
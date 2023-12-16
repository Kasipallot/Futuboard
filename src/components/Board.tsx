import { Box } from "@mui/material";
import { Column as ColumnType } from "../types"
import Column from "./Column"

interface BoardProps {
    columns: ColumnType[]
}

const Board: React.FC<BoardProps> = ({ columns }) => {
    console.log(columns);
    return (
        <Box style={{ display: 'inline-flex', height: '100vh', width:'fit-content' , margin:'25px'}} sx={{margin: '120px 0 0 0'}}>
            {columns.map((column, index) => (
                <Column key={column.id} column={column} index={index} />
            ))}
        </Box>
    );
};

export default Board
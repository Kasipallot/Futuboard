import { Box } from "@mui/material";
import { DragDropContext,  DropResult, ResponderProvided } from '@hello-pangea/dnd';
import { Column as ColumnType } from "../types"
import Column from "./Column"

interface BoardProps {
    columns: ColumnType[]
}

const Board: React.FC<BoardProps> = ({ columns }) => {
    const handleOnDragEnd = (result: DropResult, provided: ResponderProvided) => {
        console.log(result, provided)
    }

    return (
        <DragDropContext onDragEnd={ handleOnDragEnd }>
           <Box style={{ display: 'inline-flex', height: '100vh', width:'fit-content' , margin:'25px'}} >
            {columns.map((column, index) => (
                
                <Column key={column.id} column={column} index={index} />
            ))}
        </Box> 
        </DragDropContext>
        
    );
};

export default Board
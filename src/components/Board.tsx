import { Column as ColumnType } from "../types"
import Column from "./Column"


interface BoardProps {
    columns: ColumnType[]
}

const Board: React.FC<BoardProps> = ({ columns }) => {
    console.log(columns);
    return (
        <>
            {columns.map((column, index) => (
                <Column key={column.id} column={column} index = {index} />
            ))}
        </>
    );
};

export default Board
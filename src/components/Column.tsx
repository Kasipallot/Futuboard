import { Typography } from "@mui/material"
import { Column } from "../types"
import Paper from '@mui/material/Paper'

interface ColumnProps {
  column : Column,
  index : number
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  console.log(column);
  return (
    <>
      <Paper elevation={4} style={{ margin: '25px', width: '250px', height: '1000px', backgroundColor: '#E5DBD9' }}>
        <Typography  variant={'h5'}  gutterBottom>{column.title}</Typography>
      </Paper>
    </>
  );
};

export default Column
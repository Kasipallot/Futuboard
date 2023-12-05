import { Typography } from "@mui/material"
import { Column } from "../types"

interface ColumnProps {
  column : Column
}

const Column : React.FC<ColumnProps> = ({column}) => {
  console.log(column)
  return (
    <>
    <Typography>{column.title}</Typography>
    </>
  )
}

export default Column
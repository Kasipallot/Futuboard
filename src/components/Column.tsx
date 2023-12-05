import { Typography } from "@mui/material"

interface columnProps {
  
}

const Column = ({column}) => {
  console.log(column)
  return (
    <>
    <Typography>{column.title}</Typography>
    </>
  )
}

export default Column
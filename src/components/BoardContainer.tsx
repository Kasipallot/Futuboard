import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, IconButton, Snackbar } from "@mui/material"
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getId } from "../services/Utils";
import { useAddColumnMutation } from "../state/apiSlice";
import { useGetBoardQuery } from "../state/apiSlice";

import Board from "./Board"
import ColumnCreationForm from "./ColumnCreationForm";


interface ColumnData {
  columnTitle: string,
}

interface CreateColumnButtonProps {
  boardId: string;
}
const CreateColumnButton: React.FC<CreateColumnButtonProps> = ({ boardId }) => {
  const [addColumn] = useAddColumnMutation();
  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => {
    setOpen(true)
  }
  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleSubmit = (data: ColumnData) => {

    const column = {
      columnid: getId(),
      title: data.columnTitle,
      boardid: boardId
    }
    addColumn({ boardId: boardId, column: column });
    setOpen(false)
  };
  return (
    <Box>
      <IconButton color="primary" aria-label="add task" onClick={handleOpenDialog}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent>
          <ColumnCreationForm onSubmit={handleSubmit} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>

  )
}

const HomeButton = () => {
  const navigate = useNavigate()
  return (
    <Button onClick={() => navigate("/")}>
      <Typography>Home</Typography>
    </Button>
  )
}

const CopyToClipboardButton = () => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(window.location.toString())
  }

  return (
    <>
      <Button onClick={handleClick} color={"primary"}>Copy link</Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  )
}



interface ToolBarProps {
  title: string;
  boardId: string; // Assuming boardId is also a string
}

//refactor later
const ToolBar = ({ title, boardId }: ToolBarProps) => {

  return (
    <AppBar position="fixed" sx={{ background: "white" }}>
      <Toolbar>
        <Box display="flex" alignContent="center">
          <HomeButton />
        </Box>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
            {title}
          </Typography>
        </Box>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h6" component="div" sx={{ color: "black" }}>
            Board ID: {boardId}
          </Typography>
          <CopyToClipboardButton />
        </Box>
        <CreateColumnButton boardId={boardId} />
      </Toolbar>
    </AppBar>

  )
}


const BoardContainer: React.FC = () => {
  const { id = "default-id" } = useParams()

  const { data: board, isLoading, isSuccess } = useGetBoardQuery(id);

  return (
    <>
      {isLoading && <Typography>Loading...</Typography>}
      {isSuccess && board && <>
        <ToolBar title={board.title} boardId={id} />
        <Board />
      </>
      }
    </>
  );
}

export default BoardContainer;

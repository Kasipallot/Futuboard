import { AppBar, Box, IconButton, Paper, Popover, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetUsersByBoardIdQuery, usePostUserToBoardMutation } from "@/state/apiSlice";

import CopyToClipboardButton from "./CopyToClipBoardButton";
import CreateColumnButton from "./CreateColumnButton";
import HomeButton from "./HomeButton";
import UserCreationForm from "./UserCreationForm";
import UserList from "./UserList";

interface FormData {
  name: string,
}

const AddUserButton: React.FC = () => {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { id = "default-id" } = useParams();
  const [addUser] = usePostUserToBoardMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnSubmit = (data : FormData) => {
    addUser({ boardId: id, user: data });
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popOverid = open ? "popover" : undefined;

  return (
    <div>
      <IconButton size="small" onClick={handleClick}>
        <svg style={{ width: "1.5rem", height: "1.5rem", color: "#2D3748" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1c0-.6.4-1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
        </svg>
      </IconButton>
      <Popover
        disableRestoreFocus
        id={popOverid}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: -10,
          horizontal: 50,
        }}
      >
        <Paper sx={{ height: "fit-content", padding: "20px", width: "200px" }}>
          <UserCreationForm onSubmit={handleOnSubmit} onCancel={handleClose} />
        </Paper>
      </Popover>
    </div>
  );
};

interface ToolBarProps {
  title: string;
  boardId: string; // Assuming boardId is also a string
}

//refactor later
const ToolBar = ({ title, boardId }: ToolBarProps) => {
  const { data: users, isSuccess } = useGetUsersByBoardIdQuery(boardId);

  return (
    <AppBar position="fixed" sx={{ background: "white", height: "80px" }}>
      <Toolbar>
        <Box display="flex" alignContent="center" sx={{ flexGrow: 1 }}>
          <HomeButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black", marginLeft: "10px" }}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
          {isSuccess && users.length > 0 &&
            <UserList users={users} />
          }
          </Box>
        </Box>
        <Box display="flex">
          <AddUserButton />
          <CopyToClipboardButton />
          <CreateColumnButton boardId={boardId} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
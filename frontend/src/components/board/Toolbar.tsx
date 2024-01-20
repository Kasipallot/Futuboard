import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import CopyToClipboardButton from "./CopyToClipBoardButton";
import CreateColumnButton from "./CreateColumnButton";
import HomeButton from "./HomeButton";

interface ToolBarProps {
    title: string;
    boardId: string; // Assuming boardId is also a string
  }

  //refactor later
  const ToolBar = ({ title, boardId }: ToolBarProps) => {
    return (
      <AppBar position="fixed" sx={{ background: "white",  height: "80px" }}>
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
            <CopyToClipboardButton />
          </Box>
          <CreateColumnButton boardId={boardId} />
        </Toolbar>
      </AppBar>
    );
  };

  export default ToolBar;
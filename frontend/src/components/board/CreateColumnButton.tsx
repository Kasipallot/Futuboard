import ColumnCreationForm from "@components/board/ColumnCreationForm";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { getId } from "@services/Utils";
import { useState } from "react";

import { useAddColumnMutation } from "@/state/apiSlice";
import { ColumnData } from "@/types";

interface CreateColumnButtonProps {
    boardId: string;
  }
  const CreateColumnButton: React.FC<CreateColumnButtonProps> = ({ boardId }) => {
    const [addColumn] = useAddColumnMutation();
    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
      setOpen(true);
    };
    const handleCloseDialog = () => {
      setOpen(false);
    };

    const handleSubmit = (data: ColumnData) => {
      const column = {
        columnid: getId(),
        title: data.columnTitle,
        boardid: boardId
      };
      addColumn({ boardId: boardId, column: column });
      setOpen(false);
    };
    return (
      <Box>
        <IconButton color="primary" aria-label="add task" onClick={handleOpenDialog}>
          <svg style={{ width: "1.5rem", height: "1.5rem", color: "#2D3748" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v14M9 5v14M4 5h16c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"/>
          </svg>
        </IconButton>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogContent>
            <ColumnCreationForm onSubmit={handleSubmit} onCancel={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </Box>

    );
  };

  export default CreateColumnButton;
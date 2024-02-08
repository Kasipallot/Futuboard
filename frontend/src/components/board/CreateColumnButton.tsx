import ColumnCreationForm from "@components/board/ColumnCreationForm";
import AddIcon from "@mui/icons-material/Add";
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
          <AddIcon />
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
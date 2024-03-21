import BoardImportForm from "@components/board/BoardImportForm";
import { Typography, Dialog, DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";

import { NewBoardFormImport } from "@/types";

interface CreateBoardButtonProps {
    onNewBoard: (data: NewBoardFormImport) => Promise<void>;
}

const CreateBoardButton = ({ onNewBoard }: CreateBoardButtonProps) => {
    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };
    const handleSubmit = (data: NewBoardFormImport) => {
        //TODO: should only temporarily update the board name. (not in this function though)
        //later should create entirely new board object and send it to database
        onNewBoard(data);
        setOpen(false);
    };
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                <Typography>Import board</Typography>
            </Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogContent>
                    <BoardImportForm onSubmit={handleSubmit} onCancel={handleCloseDialog}/>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateBoardButton;
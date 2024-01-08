import BoardCreationForm from "@components/board/BoardCreationForm";
import { Box, Typography, Dialog, DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";

import { NewBoardFormData } from "@/types";

interface CreateBoardButtonProps {
    onNewBoard: (data: NewBoardFormData) => Promise<void>;
}

const CreateBoardButton = ({ onNewBoard }: CreateBoardButtonProps) => {
    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };
    const handleSubmit = (data: NewBoardFormData) => {
        //TODO: should only temporarily update the board name. (not in this function though)
        //later should create entirely new board object and send it to database
        onNewBoard(data);
        setOpen(false);
    };
    return (
        <Box>
            <Button sx={{ background: "white" }} onClick={handleOpenDialog}>
                <Typography>Create board</Typography>
            </Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogContent>
                    <BoardCreationForm onSubmit={handleSubmit} onCancel={handleCloseDialog}/>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CreateBoardButton;
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Paper, Box, Typography, Dialog, DialogContent } from '@mui/material';
import BoardCreationForm from './BoardCreationForm';
import { getId } from '../services/Utils'
import { useNavigate } from 'react-router-dom'
import { Board } from '../types';
import { useAddBoardMutation } from '../state/apiSlice';
import { NewBoardFormData } from '../types';

interface CreateBoardButtonProps {
    onNewBoard: (data: FormData) => void;
}

const CreateBoardButton = ({ onNewBoard }: CreateBoardButtonProps) => {
    const [open, setOpen] = useState(false)

    const handleOpenDialog = () => {
        setOpen(true)
    }
    const handleCloseDialog = () => {
        setOpen(false)
    }
    const handleSubmit = (data: NewBoardFormData) => {
        //TODO: should only temporarily update the board name. (not in this function though)
        //later should create entirely new board object and send it to database
        onNewBoard(data)
        setOpen(false)
    }
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
    )
}

const Home: React.FC = () => {

    const navigate = useNavigate()
    const [addBoard] = useAddBoardMutation()

    const handleCreateBoard = async ({ title, password }: NewBoardFormData) => {

        const id = getId()
        const board: Board = {
            id,
            title,
            password,
            users: [],
            columns:[]
        }
        //send board object to server
        await addBoard(board)
        //redirect to created board page
        navigate(`/board/${id}`)
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
            <Box textAlign="center">
                <Typography>
                    Futuboard home page
                </Typography>
                <Paper>
                    <CreateBoardButton onNewBoard={handleCreateBoard} />
                </Paper>
            </Box>
        </Box>
    );
};

export default Home;

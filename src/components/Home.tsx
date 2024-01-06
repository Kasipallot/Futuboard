import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Paper, Box, Typography, Dialog, DialogContent } from '@mui/material';
import BoardCreationForm from './BoardCreationForm';
import { getId } from '../services/Utils'
import { useNavigate } from 'react-router-dom'
import { Board } from '../types';
import { useAddBoardMutation } from '../state/apiSlice';

interface CreateBoardButtonProps {
    onNewBoard: (data: FormData) => void;
}

interface FormData {
    title: string
}

interface CreateBoardArgs {
    title: string;
}

const CreateBoardButton = (props: CreateBoardButtonProps) => {
    const { onNewBoard } = props
    const [open, setOpen] = useState(false)

    const handleOpenDialog = () => {
        setOpen(true)
    }
    const handleCloseDialog = () => {
        setOpen(false)
    }
    const handleSubmit = (data: FormData) => {
        onNewBoard({ title: data.title })
        setOpen(false)
    }
    return (
        <Box>
            <Button sx={{ background: "white" }} onClick={handleOpenDialog}>
                <Typography>Create board</Typography>
            </Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogContent>
                    <BoardCreationForm onSubmit={handleSubmit} onCancel={handleCloseDialog} />
                </DialogContent>
            </Dialog>
        </Box>
    )
}

const Home: React.FC = () => {

    const navigate = useNavigate()
    const [addBoard] = useAddBoardMutation()

    const handleCreateBoard = async ({ title }: CreateBoardArgs) => {

        const id = getId()
        const board: Board = {
            id,
            title,
            columns: [],
            users: []
        }
        //send board object to server
        await addBoard(board)
        //redirect to created board page
        navigate(`/board/${id}`)
    }

    return (
        <Box>
            <Box>
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


import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { Paper, Box, Typography, Dialog, DialogContent } from '@mui/material';
import BoardCreationForm from './BoardCreationForm';
import {getId} from '../services/Utils'
import {useNavigate} from 'react-router-dom'
import { Board } from '../types';
import { useAddBoardMutation } from '../state/apiSlice';

interface CreateBoardButtonProps {
    onNewBoard: Function ; // Replace Function with a more specific type if needed
  }

interface FormData {
    // Define the structure of your form data here
    boardTitle: string
  }

interface CreateBoardArgs {
    title: string;
}

const CreateBoardButton = (props: CreateBoardButtonProps) => {
    const {onNewBoard} = props
    const [open, setOpen] = useState(false)

    const handleOpenDialog = () => {
        setOpen(true)
    }
    const handleCloseDialog = () => {
        setOpen(false)
    }
    const handleSubmit = (data: FormData) => {
        //TODO: should only temporarily update the board name. (not in this function though)
        //later should create entirely new board object and send it to database
        //later: get password for board
        onNewBoard({title: data.boardTitle})
        setOpen(false)
    }
    return(
        <Box>
            <Button sx={{background:"white"}} onClick={handleOpenDialog}>
                <Typography>Create board</Typography>
            </Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogContent>
                    <BoardCreationForm onSubmit = {handleSubmit} onCancel = {handleCloseDialog}/>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

const Home: React.FC = () => {
    
    const navigate = useNavigate()
    const [addBoard] = useAddBoardMutation()

    const handleCreateBoard = ({ title }: CreateBoardArgs) => {
        
        const id = getId()
        const board : Board = {
            id,
            title,
            columns:[],
            users:[]
        }
        //send board object to server
        addBoard(board)
        //redirect to created board page
        navigate(`/board/${id}`)
        }

return (
    <Box display="flow-root" justifyContent="center" alignItems="center" height="100vh">
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

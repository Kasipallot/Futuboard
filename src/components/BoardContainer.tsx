
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useParams } from 'react-router-dom';

import {useNavigate} from 'react-router-dom'

import Board from './Board'
import { useGetBoardQuery } from '../state/apiSlice';

import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ColumnCreationForm from "./ColumnCreationForm";
import { Dialog, DialogContent, IconButton } from "@mui/material"

interface ColumnData {
  columnTitle: string,
}

const CreateColumnButton:React.FC = () => {
    const [open, setOpen] = useState(false)
  
      const handleOpenDialog = () => {
        setOpen(true)
    }
    const handleCloseDialog = () => {
        setOpen(false)
    }
    const handleSubmit = (data: ColumnData) => {
      //data holds the task object. send to server. log for now
      console.log(data)
      setOpen(false)
  
    }
    return(
      <Box>
        <IconButton color="primary" aria-label="add task" onClick = {handleOpenDialog}>
              <AddIcon />
        </IconButton>
        <Dialog open={open} onClose={handleCloseDialog}>
                <DialogContent>
                    <ColumnCreationForm onSubmit = {handleSubmit} onCancel = {handleCloseDialog}/>
                </DialogContent>
          </Dialog>
      </Box>
      
    )
  }

const HomeButton = () => {
    const navigate = useNavigate()
    return(
        <Button onClick={() => navigate('/')}>
            <Typography>Home</Typography>
        </Button>
    )
}

interface ToolBarProps {
    title: string;
    boardId: string; // Assuming boardId is also a string
  }
  
//refactor later
const ToolBar = ({title, boardId}: ToolBarProps) => {

    return(
        <AppBar position="fixed" sx={{background:"white"}}>
            <Toolbar>
                <Box display ="flex" alignContent="center">
                <HomeButton/> 
                </Box>
                <Box display="flex" flexGrow={1}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"black"}}>
                        {title}
                    </Typography>
                </Box>
                <Box display="flex" flexGrow={1}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"black"}}>
                     Board ID: {boardId}
                </Typography> 
                </Box>
                <CreateColumnButton/>
            </Toolbar>
        </AppBar> 
    
    )
}


//use boardContainer to initialize board state (maybe implement droppable drag and drop here around <Board/>)
const BoardContainer:React.FC = () => {
    let id = useParams().id
    //hacky way to get rid of undefined error
    if(!id) {
        id = "defaultId"
    }
    
    const {data : board, isLoading, isSuccess} = useGetBoardQuery(id); 
    console.log(board);
       
  return (
    <>
    {isLoading && <Typography>Loading...</Typography>}
    {isSuccess && board && <>
    <ToolBar title={board.title} boardId={id}/>
    <Board columns={board.columns} />
    </>
    }
    </>
  );
}

export default BoardContainer;

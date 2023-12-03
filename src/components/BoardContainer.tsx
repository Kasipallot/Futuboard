
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
    

    const {data : board, isLoading, isSuccess} = useGetBoardQuery(id); //tält saa kans loading ja error statuksen
    console.log(board);
       
    
  return (
    <>
    {isLoading && <div>Loading...</div>}
    {isSuccess && board && 
    <ToolBar title={board.title} boardId={id || 'defaultId'}/>}
      <Board/>
    </>
  );
}

export default BoardContainer;

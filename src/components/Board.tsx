
import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useParams } from 'react-router-dom';
import { getBoardData } from './services/Utils';
import {useNavigate} from 'react-router-dom'


const HomeButton = () => {
    const navigate = useNavigate()
    return(
        <Button onClick={() => navigate('/')}>
            <Typography>Home</Typography>
        </Button>
    )
}

//refactor later
const ToolBar = ({title, boardId}) => {

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


const initialState = {
    board: {
        id : "",
        title: "",
    }
}

const Board:React.FC = () => {
    const [boardState, setBoardState] = useState(initialState)
    const id = useParams().id
    
    //get name, everything from database
    useEffect(() => {
        const board = getBoardData(id)
        console.log(board)
        setBoardState({board: board})
    }, [])

    
  return (
    <>
      <ToolBar title={boardState.board.title} boardId={id}/>
    </>
  );
}

export default Board;
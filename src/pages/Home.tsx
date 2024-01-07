import CreateBoardButton from "@components/home/CreateBoardButton";
import { Box, Typography, Paper } from "@mui/material";
import { getId } from "@services/Utils";
import { useNavigate } from "react-router-dom";

import { useAddBoardMutation } from "@/state/apiSlice";
import { Board, NewBoardFormData } from "@/types";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [addBoard] = useAddBoardMutation();

    const handleCreateBoard = async ({ title, password }: NewBoardFormData) => {

        const id = getId();
        const board: Board = {
            id,
            title,
            password,
            users: [],
            columns:[]
        };
        //send board object to server
        await addBoard(board);
        //redirect to created board page
        navigate(`/board/${id}`);
    };

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

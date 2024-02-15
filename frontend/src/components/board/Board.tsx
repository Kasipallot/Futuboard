import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";

import {  useGetColumnsByBoardIdQuery } from "../../state/apiSlice";

import Column from "./Column";

const Board: React.FC = () => {
    const { id = "default-id" } = useParams();

    const { data: columns, isLoading, isSuccess } = useGetColumnsByBoardIdQuery(id);

    if (isLoading) {
        return (
            <Typography>Loading columns...</Typography>
        );
    }

    if (isSuccess && columns.length === 0) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                {/*
                <Typography sx={{ marginBottom: 1 }}>
                    Return to home by clicking:
                    <svg style={{ width: "1.5rem", height: "1.5rem", color: "#2D3748" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z" clip-rule="evenodd"/>
                    </svg>
                </Typography>
                */}
                <Typography sx={{ marginBottom: 1 }}>
                    Add a user by clicking:
                    <svg style={{ width: "1.5rem", height: "1.5rem", color: "#2D3748", verticalAlign: "middle", marginLeft: 5 }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1c0-.6.4-1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                    </svg>
                </Typography>
                <Typography sx={{ marginBottom: 1 }}>
                    Copy board link by clicking:
                    <svg style={{ width: "1.5rem", height: "1.5rem", color: "#2D3748", marginLeft: 5 }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.2 9.8a3.4 3.4 0 0 0-4.8 0L5 13.2A3.4 3.4 0 0 0 9.8 18l.3-.3m-.3-4.5a3.4 3.4 0 0 0 4.8 0L18 9.8A3.4 3.4 0 0 0 13.2 5l-1 1"/>
                    </svg>
                </Typography>
                <Typography sx={{ marginBottom: 1 }}>
                    Add a column by clicking:
                    <svg style={{ width: "1.5rem", height: "1.5rem", color: "#2D3748", marginLeft: 5 }} fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g id="Edit / Add_Column">
                                <path id="Vector" d="M5 17H8M8 17H11M8 17V14M8 17V20M14 21H15C16.1046 21 17 20.1046 17 19V5C17 3.89543 16.1046 3 15 3H13C11.8954 3 11 3.89543 11 5V11" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </g>
                    </svg>
                </Typography>
            </Box>
        );
    }

    return (
            <Box sx={{ display: "inline-flex", height: "100vh", width: "fit-content", margin: "4rem 25px 25px 25px" }} >
                {isSuccess && columns.map((column, index) => (
                    <Column key={column.columnid} column={column} index={index} />
                ))}
            </Box>
    );
};

export default Board;
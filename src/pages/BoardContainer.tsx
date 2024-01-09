import ToolBar from "@components/board/Toolbar";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import Board from "../components/board/Board";
import { useGetBoardQuery } from "../state/apiSlice";
import AccessBoardForm from "../components/board/AccessBoardForm";
import { useState } from "react";

const BoardContainer: React.FC = () => {
  const [islogged, setlogin] = useState(false);
  const [password, setpassword] = useState("");

  const { id = "default-id" } = useParams();

  let board;
  let isLoading: boolean = false;
  let isSuccess: boolean = false;

  const isLogged = true; // Replace this with your actual condition

  if (isLogged) {
    // Assuming `useGetBoardQuery` returns a promise or some asynchronous operation
    const {
      data,
      isLoading: loading,
      isSuccess: success,
    } = useGetBoardQuery(id);

    // Assign values to the variables declared outside the if statement
    board = data;
    isLoading = loading;
    isSuccess = success;
  }
  return (
    <>
      {!islogged && <AccessBoardForm id={id} passfunc={setpassword} login={setlogin} />}
      {islogged && isLoading && <Typography>Loading...</Typography>}
      {islogged && isSuccess && board && (
        <>
          <ToolBar title={board.title} boardId={id} />
          <Board />
        </>
      )}
    </>
  );
};

export default BoardContainer;

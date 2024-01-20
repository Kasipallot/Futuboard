import ToolBar from "@components/board/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useParams } from "react-router-dom";

import AccessBoardForm from "../components/board/AccessBoardForm";
import Board from "../components/board/Board";
import { useGetBoardQuery } from "../state/apiSlice";

const BoardContainer: React.FC = () => {
  const [islogged, setLogin] = useState(false);
  const { id = "default-id" } = useParams();

  const {
    data: board,
    isLoading: loading,
    status
  } = useGetBoardQuery(id);

  if (status === "fulfilled" || islogged) {
    return (
      <>
        <ToolBar boardId={id} title={board?.title || ""} />
        <Board />
      </>
    );
  }

  return (
    <>
      {loading ?
        <Typography>Loading...</Typography> :
        <AccessBoardForm id={id} login={setLogin} />}
    </>
  );
};

export default BoardContainer;

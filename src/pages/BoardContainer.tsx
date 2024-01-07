import ToolBar from "@components/board/Toolbar";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import Board from "../components/board/Board";
import { useGetBoardQuery } from "../state/apiSlice";

const BoardContainer: React.FC = () => {
  const { id = "default-id" } = useParams();
  const { data: board, isLoading, isSuccess } = useGetBoardQuery(id);

  return (
    <>
      {isLoading && <Typography>Loading...</Typography>}
      {isSuccess && board && <>
        <ToolBar title={board.title} boardId={id} />
        <Board />
      </>
      }
    </>
  );
};

export default BoardContainer;

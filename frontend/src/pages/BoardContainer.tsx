import ToolBar from "@components/board/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket"
import { useDispatch } from "react-redux";

import AccessBoardForm from "../components/board/AccessBoardForm";
import Board from "../components/board/Board";
import { useGetBoardQuery } from "../state/apiSlice";
/*
 sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
*/

const BoardContainer: React.FC = () => {
  const [islogged, setLogin] = useState(false);
  const { id = "default-id" } = useParams();
  const {
    data: board,
    isLoading: loading,
    status
  } = useGetBoardQuery(id);
  
  const socket = useWebSocket(`ws://127.0.0.1:8000/board/${id}`, {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: (message) => {
            console.log(message);
            //refetch();
            /*dispatch(boardsApi.endpoints.getColumnsByBoardId.initiate(
                {subscribe: false, forceRefetch: true}
            ))*/
        },
        share: true
  });
  
  if (status === "fulfilled" || islogged) {
    return (
      <>
        <ToolBar boardId={id} title={board?.title || ""} />
        <Board socket={socket} />
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

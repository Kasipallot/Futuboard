import ToolBar from "@components/board/Toolbar";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useWebSocket, { SendMessage } from "react-use-websocket";

import { getId } from "@/services/Utils";
import { store } from "@/state/store";
import { Task } from "@/types";

import AccessBoardForm from "../components/board/AccessBoardForm";
import Board from "../components/board/Board";
import { boardsApi, useGetBoardQuery, usePostUserToTicketMutation, useUpdateTaskListByColumnIdMutation, useUpdateUserListByTicketIdMutation, useLoginMutation, useDeleteUserMutation } from "../state/apiSlice";
import { Box, CircularProgress } from "@mui/material";

export const WebsocketContext = createContext<SendMessage | null>(null);

const clientId = getId();

const BoardContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [islogged, setLogin] = useState(false);
  const { id = "default-id" } = useParams();
  const [ deleteUser ] = useDeleteUserMutation();
  // websocket object
  const { sendMessage } = useWebSocket(import.meta.env.VITE_WEBSOCKET_ADDRESS + id, {  //`wss://futuboardbackend.azurewebsites.net/board/${id}`
    onOpen: () => {
      console.log("opened");
  },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: () => true,
    onMessage: (event) => {
      const data = JSON.parse(event.data);
        if (data.message !== clientId) {
          dispatch(boardsApi.util.invalidateTags(["Boards", "Columns", "Ticket", "Users"]));
        }
    },
    share: true
});
  const [updateTaskList] = useUpdateTaskListByColumnIdMutation();
  const [postUserToTask] = usePostUserToTicketMutation();
  const [updateUsers] = useUpdateUserListByTicketIdMutation();
  const [tryLogin] = useLoginMutation();
  const [defaultLoginCompleted, setDefaultLoginCompleted] = useState(false);

  const selectTasksByColumnId = boardsApi.endpoints.getTaskListByColumnId.select;
  const selectUsersByBoardId = boardsApi.endpoints.getUsersByBoardId.select;
  const selectUsersByTaskId = boardsApi.endpoints.getUsersByTicketId.select;

  const handleOnDragEnd = async (result: DropResult) => {
    const { source, destination, type, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const state = store.getState();

    const userList = selectUsersByBoardId(id)(state).data || [];

    const selectDestinationTaskUsers = selectUsersByTaskId(destination.droppableId);
    const destinationUsers = selectDestinationTaskUsers(state).data || [];

    const selectSourceTaskUsers = selectUsersByTaskId(source.droppableId);
    const sourceUsers = selectSourceTaskUsers(state).data || [];

    const selectDestinationTasks = selectTasksByColumnId({ boardId: id, columnId: destination.droppableId });
    const destinationTasks = selectDestinationTasks(state).data || [];

    const selectSourceTasks = selectTasksByColumnId({ boardId: id, columnId: source.droppableId });
    const sourceTasks = selectSourceTasks(state).data || [];

    if (type === "task") {
      //dragging tasks in the same column
      if (destination.droppableId === source.droppableId) {
        const dataCopy = [...destinationTasks ?? []];
        const newOrdered = reorder<Task>(dataCopy, source.index, destination.index);
        await updateTaskList({ boardId: id, columnId: source.droppableId, tasks: newOrdered });
        sendMessage(clientId);
      }
      //dragging tasks to different columns
      if (destination.droppableId !== source.droppableId) {

        //remove task from source column
        const nextSourceTasks = produce(sourceTasks, (draft) => {
          draft?.splice(source.index, 1);
        });

        //TODO: source tasks, dont need to be sent to server, just updated in cache

        //add task to destination column
        const nextDestinationTasks = produce(destinationTasks, (draft) => {
          draft?.splice(destination!.index, 0, sourceTasks![source.index]);
        });
        await Promise.all([updateTaskList({ boardId: id, columnId: destination.droppableId, tasks: nextDestinationTasks ?? [] }), updateTaskList({ boardId: id, columnId: source.droppableId, tasks: nextSourceTasks ?? [] })]);
        sendMessage(clientId);
      }
    }
    if (type === "user") {
      const destinationTaskUsers = selectDestinationTaskUsers(state).data || [];
      const sourceTaskUsers = selectSourceTaskUsers(state).data || [];

      if (destinationTaskUsers.length >= 3 && destination.droppableId != "user-list") {
        alert("Destination task already has 3 or more user magnets. Move not allowed.");
        return;
      }
      const sourceTaskList = source.droppableId === "user-list" ? userList : sourceTaskUsers;
      const movingUserName = sourceTaskList.find(user => user.userid === draggableId)?.name;

      const isUnique = !destinationUsers.some(user => user.name === movingUserName);
      if (!isUnique && destination.droppableId != "user-list") {
        alert("This member is already working on the task. Move not allowed.");
        return;
      }
      //dragging user from user list to a task
      if (source.droppableId == "user-list" && destination.droppableId !== "user-list") { //when dragging from user list send POST to create a new instance of the user
        await postUserToTask({ ticketId: destination.droppableId, user: userList[source.index] });
        sendMessage(clientId);
      }
      if (destination.droppableId !== source.droppableId && source.droppableId !== "user-list") { //when dragging from a task to another task
        const nextDestinationUsers = produce(destinationUsers, (draft) => {
          draft?.splice(destination!.index, 0, sourceUsers![source.index]);
        });

        const nextSourceUsers = produce(sourceUsers, (draft) => {
          draft?.splice(source.index, 1);
        });
        if (destination.droppableId !== "user-list") {
          await Promise.all([updateUsers({ ticketId: destination.droppableId, users: nextDestinationUsers ?? [] }), updateUsers({ ticketId: source.droppableId, users: nextSourceUsers ?? [] }) ]); //update destination task users
        }
        //Drop animation?
        if(destination.droppableId === "user-list"){
          // DELETE request to remove user from task
          const user = sourceUsers![source.index];
          await Promise.all([deleteUser({ userId: user.userid }), updateUsers({ ticketId: source.droppableId, users: nextSourceUsers ?? [] })]);
        }
        sendMessage(clientId);
        // TODO make source task update optimistically

      }
    }
  };

  const {
    data: board,
    isLoading: loading,
    status
  } = useGetBoardQuery(id, { skip: !islogged });

  useEffect(() => {
    const defaultLogin = tryLogin({ boardId: id, password: "" });
    defaultLogin.then((res) => {
      setDefaultLoginCompleted(true);
      if("data" in res && res.data.success){
        setLogin(true);
      }
    });
  }, [id, tryLogin]);

  if (status === "fulfilled" || islogged) {
    return (
      <WebsocketContext.Provider value={sendMessage}>
      <>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <ToolBar boardId={id} title={board?.title || ""} />
          <Board />
        </DragDropContext>
      </>
      </WebsocketContext.Provider>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {loading || !defaultLoginCompleted ?
        <CircularProgress /> :
        <AccessBoardForm id={id} login={setLogin} />}
      </Box>
    </>
  );
};

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list) as T[];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default BoardContainer;

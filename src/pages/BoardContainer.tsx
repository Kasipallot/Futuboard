import ToolBar from "@components/board/Toolbar";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Typography from "@mui/material/Typography";
import { produce } from "immer";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { store } from "@/state/store";
import { Task } from "@/types";

import AccessBoardForm from "../components/board/AccessBoardForm";
import Board from "../components/board/Board";
import { boardsApi, useGetBoardQuery,  useUpdateTaskListByColumnIdMutation } from "../state/apiSlice";

const BoardContainer: React.FC = () => {
  const [islogged, setLogin] = useState(false);
  const { id = "default-id" } = useParams();

  const [updateTaskList] = useUpdateTaskListByColumnIdMutation();

  const selectTasksByColumnId = boardsApi.endpoints.getTaskListByColumnId.select;

  const handleOnDragEnd = async (result: DropResult) => {
      const { source, destination, type } = result;

      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      const state = store.getState();

      const selectDestinationTasks = selectTasksByColumnId({ boardId: id, columnId: destination.droppableId });
      const destinationTasks = selectDestinationTasks(state).data || [];

      const selectSourceTasks = selectTasksByColumnId({ boardId: id, columnId: source.droppableId });
      const sourceTasks = selectSourceTasks(state).data || [];

      if (type === "task") {
          //dragging tasks in the same column
          if (destination.droppableId === source.droppableId) {
              const dataCopy = [...destinationTasks ?? []];
              const newOrdered = reorder<Task>(dataCopy, source.index, destination.index);
              updateTaskList({ boardId: id, columnId: source.droppableId, tasks: newOrdered });
          }
          //dragging tasks to different columns
          if (destination.droppableId !== source.droppableId) {

              //remove task from source column
              const nextSourceTasks = produce(sourceTasks, (draft) => {
                  draft?.splice(source.index, 1);
              });

              //TODO: source tasks, dont need to be sent to server, just updated in cache
              updateTaskList({ boardId: id, columnId: source.droppableId, tasks: nextSourceTasks ?? [] });

              //add task to destination column
              const nextDestinationTasks = produce(destinationTasks, (draft) => {
                  draft?.splice(destination!.index, 0, sourceTasks![source.index]);
              });
              updateTaskList({ boardId: id, columnId: destination.droppableId, tasks: nextDestinationTasks ?? [] });
          }
      }
  };

  const {
    data: board,
    isLoading: loading,
    status
  } = useGetBoardQuery(id);

  if (status === "fulfilled" || islogged) {
    return (
      <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <ToolBar boardId={id} title={board?.title || ""} />
        <Board />
        </DragDropContext>
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

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list) as T[];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default BoardContainer;

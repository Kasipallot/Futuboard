import { useParams } from "react-router";
import { Box, Typography } from "@mui/material";
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from "./Column"
import { boardsApi, useGetColumnsByBoardIdQuery, useUpdateTaskListByColumnIdMutation } from "../../state/apiSlice";
import { Task } from "../../types";
import { produce } from 'immer'
import { store } from "../../state/store";


const Board: React.FC = () => {
    const { id = 'default-id' } = useParams()

    const { data: columns, isLoading, isSuccess } = useGetColumnsByBoardIdQuery(id)

    const [updateTaskList] = useUpdateTaskListByColumnIdMutation()

    const selectTasksByColumnId = boardsApi.endpoints.getTaskListByColumnId.select;

    const handleOnDragEnd = async (result: DropResult) => {
        const { source, destination, type } = result

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const state = store.getState();

        const selectDestinationTasks = selectTasksByColumnId({ boardId: id, columnId: destination.droppableId });
        const destinationTasks = selectDestinationTasks(state).data || [];

        const selectSourceTasks = selectTasksByColumnId({ boardId: id, columnId: source.droppableId });
        const sourceTasks = selectSourceTasks(state).data || [];

        if (type === 'task') {
            //dragging tasks in the same column
            if (destination.droppableId === source.droppableId) {
                const dataCopy = [...destinationTasks ?? []]
                const newOrdered = reorder<Task>(dataCopy, source.index, destination.index)
                updateTaskList({ boardId: id, columnId: source.droppableId, tasks: newOrdered })
            }
            //dragging tasks to different columns
            if (destination.droppableId !== source.droppableId) {

                //remove task from source column
                const nextSourceTasks = produce(sourceTasks, (draft) => {
                    draft?.splice(source.index, 1)
                })

                updateTaskList({ boardId: id, columnId: source.droppableId, tasks: nextSourceTasks ?? [] })

                //add task to destination column
                const nextDestinationTasks = produce(destinationTasks, (draft) => {
                    draft?.splice(destination!.index, 0, sourceTasks![source.index])
                })
                updateTaskList({ boardId: id, columnId: destination.droppableId, tasks: nextDestinationTasks ?? [] })
            }
        }
    }

    if (isLoading) {
        return <Typography>Loading columns...</Typography>
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Box sx={{ display: "inline-flex", height: "100vh", width: "fit-content", margin: "4rem 25px 25px 25px" }} >
                {isSuccess && columns.map((column, index) => (
                    <Column key={column.columnid} column={column} index={index} />
                ))}
            </Box>
        </DragDropContext>

    );
};

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list) as T[];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

export default Board
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import { boardsApi } from "../../state/apiSlice";
import { useGetColumnsByBoardIdQuery, useUpdateColumnMutation } from "../../state/apiSlice";
import { AppDispatch, store } from "../../state/store";

import Column from "./Column";

const Board: React.FC = () => {
    const { id = "default-id" } = useParams();
    const [updateColumn] = useUpdateColumnMutation();
    const dispatch: AppDispatch = useDispatch();

    const { data: columns, isLoading, isSuccess } = useGetColumnsByBoardIdQuery(id);

    const selectTasksByColumnId = boardsApi.endpoints.getTaskListByColumnId.select;

    const handleOnDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        const state = store.getState();
        const selectSourceTasks = selectTasksByColumnId({ boardId: id, columnId: source.droppableId });
        const selectDestinationTasks = selectTasksByColumnId({ boardId: id, columnId: destination.droppableId });
        const sourceTasks = selectSourceTasks(state).data || [];
        const destinationTasks = selectDestinationTasks(state).data || [];

        const task = sourceTasks.find(task => task.ticketid === draggableId);
        const column = columns?.find(column => column.columnid === destination.droppableId);

        // return if task or column is undefined
        if (!task?.ticketid || !column?.columnid) return;

        const newDestinationColumnTicketIds = [...destinationTasks.map(task => task.ticketid), task.ticketid];

        // optimistic update the task list in the source and destination columns to prevent flickering
        dispatch(
            boardsApi.util.updateQueryData("getTaskListByColumnId", { boardId: id, columnId: source.droppableId }, draftTasks =>
                draftTasks.filter(task => task.ticketid !== draggableId)
            )
        );
        dispatch(
            boardsApi.util.updateQueryData("getTaskListByColumnId", { boardId: id, columnId: destination.droppableId }, draftTasks => {
                const newTask = draftTasks.find(task => task.ticketid === draggableId);
                if (!newTask) {
                    draftTasks.push(task);
                }
            })
        );
        updateColumn({ column, ticketIds: newDestinationColumnTicketIds });
    };

    if (isLoading) {
        return <Typography>Loading columns...</Typography>;
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

export default Board;
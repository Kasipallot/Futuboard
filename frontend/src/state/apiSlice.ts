import { PatchCollection } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import {
    TagDescription,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { Board, Column, Task } from "../types";

export const boardsApi = createApi({
    reducerPath: "boardsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://futuboardbackend.azurewebsites.net/api/" }),
    tagTypes: ["Boards", "Columns", "Ticket"],
    endpoints: (builder) => ({
        getBoard: builder.query<Board, string>({
            query: (boardId) => `boards/${boardId}/`,
            providesTags: ["Boards"],
        }),

        addBoard: builder.mutation<Board, Board>({
            query: (board) => ({
                url: "boards/",
                method: "POST",
                body: board,
            }),
            invalidatesTags: ["Boards"],
        }),

        getColumnsByBoardId: builder.query<Column[], string>({
            query: (boardid) => `boards/${boardid}/columns/`,
            providesTags: [{ type: "Columns", id: "LIST" }],
        }),

        getTaskListByColumnId: builder.query< Task[], { boardId: string; columnId: string }>({
            query: ({ boardId, columnId }) => {
                return `boards/${boardId}/columns/${columnId}/tickets`;
            },
            providesTags: (result, _error, args) => {
                const tags: TagDescription<"Ticket">[] = [];
                if (result) {
                    const tasks: Task[] = result;
                    tasks.forEach((task) => {
                        tags.push({ type: "Ticket", id: task.ticketid });
                    });
                }
                return [{ type: "Columns", id: args.columnId }, ...tags];
            },
        }),

        addColumn: builder.mutation<Column, { boardId: string; column: Column }>({
            query: ({ boardId, column }) => ({
                url: `boards/${boardId}/columns/`,
                method: "POST",
                body: column,
            }),
            invalidatesTags: ["Columns"],
        }),

        addTask: builder.mutation<Task, { boardId: string; columnId: string; task: Task }>({
            query: ({ boardId, columnId, task }) => ({
                url: `boards/${boardId}/columns/${columnId}/tickets`,
                method: "POST",
                body: task,
            }),
            invalidatesTags: (_result, _error, { columnId }) => [
                { type: "Columns", id: columnId },
            ],
        }),

        updateTask: builder.mutation<Task, { task: Task }>({
            query: ({ task }) => ({
                url: `columns/${task.columnid}/tickets/${task.ticketid}/`,
                method: "PUT",
                body: task,
            }),
            invalidatesTags: (_result, _error, { task }) => [
                { type: "Ticket", id: task.ticketid },
            ],
        }),

        updateColumn: builder.mutation<Column, { column: Column, ticketIds?: string[] }>({
            query: ({ column, ticketIds }) => ({
                url: `boards/${column.boardid}/columns/${column.columnid}/`,
                method: "PUT",
                body: { ...column, ticket_ids: ticketIds }
            }),
            invalidatesTags: ["Columns"]
        }),
        //optimistclly updates task list
        updateTaskListByColumnId: builder.mutation<Task[], { boardId: string, columnId: string, tasks: Task[] }>({
            query: ({ boardId, columnId, tasks }) => ({
                url: `boards/${boardId}/columns/${columnId}/tickets`,
                method: "PUT",
                body: tasks
            }),

            async onQueryStarted(patchArgs: { boardId: string, columnId: string, tasks: Task[] }, apiActions) {
                const cacheList = boardsApi.util.selectInvalidatedBy(apiActions.getState(), [{ type: "Columns", id: patchArgs.columnId }]);
                const patchResults: PatchCollection[] = [];
                cacheList.forEach((cache) => {
                    if (cache.endpointName === "getTaskListByColumnId") {
                        const patchResult = apiActions.dispatch(
                            boardsApi.util.updateQueryData("getTaskListByColumnId", cache.originalArgs, () => {
                                const updatedTasks = patchArgs.tasks.map(task => ({
                                    ...task,
                                    columnid: patchArgs.columnId
                                }));
                                return updatedTasks;
                            })
                        );
                        patchResults.push(patchResult);
                    }

                });

                try {
                    await apiActions.queryFulfilled;
                } catch {
                    patchResults.forEach((patchResult) => {
                        patchResult.undo();
                    });
                    apiActions.dispatch(boardsApi.util.invalidateTags([{ type: "Columns", id: patchArgs.columnId }]));
                }

            },
        }),
        login: builder.mutation<{ success: boolean }, { boardId: string; password: string }>({
            query: ({ boardId, password }) => ({
                url: `boards/${boardId}/`,
                method: "POST",
                body: { boardId, password },
            }),
            invalidatesTags: ["Boards"],
        }),
    }),
});

export const {
    useGetBoardQuery,
    useAddBoardMutation,
    useGetColumnsByBoardIdQuery,
    useGetTaskListByColumnIdQuery,
    useAddColumnMutation,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useUpdateColumnMutation,
    useLoginMutation,
    useUpdateTaskListByColumnIdMutation,
} = boardsApi;

import { PatchCollection } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import {
    TagDescription,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { Board, Column, Task, User } from "../types";

export const boardsApi = createApi({
    reducerPath: "boardsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),//https://futuboardbackend.azurewebsites.net
    tagTypes: ["Boards", "Columns", "Ticket", "Users"],
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
        getUsersByBoardId: builder.query<User[], string>({
            query: (boardId) => `boards/${boardId}/users/`,
            providesTags: [{ type: "Users", id: "USERLIST" }],
        }),
        postUserToBoard: builder.mutation<User, { boardId: string; user: Omit<User, "userid"> }>({
            query: ({ boardId, user }) => ({
                url: `boards/${boardId}/users/`,
                method: "POST",
                body: user,
            }),
            invalidatesTags: [{ type: "Users", id: "USERLIST" }],
        }),
        login: builder.mutation<{ success: boolean }, { boardId: string; password: string }>({
            query: ({ boardId, password }) => ({
                url: `boards/${boardId}/`,
                method: "POST",
                body: { boardId, password },
            }),
            invalidatesTags: ["Boards"],
        }),
        getUsersByTicketId: builder.query<User[], string>({
            query: (ticketId) => `tickets/${ticketId}/users/`,
            providesTags: (result, _error, args) => {
                const tags: TagDescription<"Users">[] = [];
                if (result) {
                    const users: User[] = result;
                    users.forEach((user) => {
                        tags.push({ type: "Users", id: user.userid });
                    });
                }
                return [{ type: "Users", id: args }, ...tags];
            },
        }),
        postUserToTicket: builder.mutation<User, { ticketId: string; user: User }>({
            query: ({ ticketId, user }) => ({
                url: `tickets/${ticketId}/users/`,
                method: "POST",
                body: user,
            }),
            invalidatesTags: (_result, _error, { ticketId }) => [
                { type: "Users", id: ticketId },
            ],
        }),
        deleteUser: builder.mutation<User, { userId: string }>({
            query: ({ userId }) => ({
                url: `users/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Users", id: "USERLIST" }],
        }),

        updateUserListByTicketId: builder.mutation<User[], { ticketId: string; users: User[]}>({
            query: ({ ticketId, users }) => ({
                url: `tickets/${ticketId}/users/`,
                method: "PUT",
                body: users
            }),
            async onQueryStarted(patchArgs: { ticketId: string, users: User[] }, apiActions) {
                const cacheList = boardsApi.util.selectInvalidatedBy(apiActions.getState(), [{ type: "Users", id: patchArgs.ticketId }]);
                const patchResults: PatchCollection[] = [];
                cacheList.forEach((cache) => {
                    if (cache.endpointName === "getUsersByTicketId") {
                        const patchResult = apiActions.dispatch(
                            boardsApi.util.updateQueryData("getUsersByTicketId", cache.originalArgs, () => {
                                const updatedUsers = patchArgs.users.map(user => ({
                                    ...user,
                                    ticketId: patchArgs.ticketId
                                }));
                                return updatedUsers;
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
                    apiActions.dispatch(boardsApi.util.invalidateTags([{ type: "Users", id: patchArgs.ticketId }]));
                }

            },
        }),
    }),
});

export const {
    useGetUsersByBoardIdQuery,
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
    usePostUserToBoardMutation,
    useGetUsersByTicketIdQuery,
    usePostUserToTicketMutation,
    useUpdateUserListByTicketIdMutation,
    useDeleteUserMutation,
} = boardsApi;

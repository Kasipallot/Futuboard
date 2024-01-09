import {
  TagDescription,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { Board, Column, Task } from "../types";

export const boardsApi = createApi({
  reducerPath: "boardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
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

    getTaskListByColumnId: builder.query<
      Task[],
      { boardId: string; columnId: string }
    >({
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

    addTask: builder.mutation<
      Task,
      { boardId: string; columnId: string; task: Task }
    >({
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

    updateColumn: builder.mutation<
      Column,
      { column: Column; ticketIds?: string[] }
    >({
      query: ({ column, ticketIds }) => ({
        url: `boards/${column.boardid}/columns/${column.columnid}/`,
        method: "PUT",
        body: { ...column, ticket_ids: ticketIds },
      }),
      invalidatesTags: ["Columns"],
    }),
    login: builder.mutation<
      { data: { data: { success: boolean } } },
      { boardId: string; password: string }
    >({
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
} = boardsApi;

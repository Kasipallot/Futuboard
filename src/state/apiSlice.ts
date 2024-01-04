<<<<<<< Updated upstream
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Board, Column } from '../types';
=======
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Board, Column, Task } from '../types';
>>>>>>> Stashed changes

export const boardsApi = createApi({
    reducerPath: 'boardsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }), //json server (npm run server)
    tagTypes: ['Boards'],
    endpoints: (builder) => ({
        getBoard: builder.query<Board, string>({
            query: (boardId) => `boards/${boardId}/`,
            providesTags: ['Boards']
        }),
        addBoard: builder.mutation<Board, Board>({
            query: (board) => ({
                url: 'boards/',
                method: 'POST',
                body: board
            }),
            invalidatesTags: ['Boards']
        }),
<<<<<<< Updated upstream
        addColumn: builder.mutation<Column, Column>({
            query: (column) => ({
                url: 'boards/${boardId}/columns/',
                method: 'POST',
                body: column
            }),
            invalidatesTags: ['Boards']
        })
    }),
})

export const { useGetBoardQuery, useAddBoardMutation, useAddColumnMutation } = boardsApi;
=======
        getColumnsByBoardId: builder.query<Column[], string>({
            query: (boardid) => `boards/${boardid}/columns/`,
            providesTags: ['Boards']
        }),
        getTaskListByColumnId: builder.query<Task[], { boardId: string, columnId: string }>({
            query: ({ boardId, columnId }) => `boards/${boardId}/columns/${columnId}/tickets`,
            providesTags: ['Boards']
        }),


    }),
})

export const { useGetBoardQuery, useAddBoardMutation, useGetColumnsByBoardIdQuery, useGetTaskListByColumnIdQuery } = boardsApi;
>>>>>>> Stashed changes

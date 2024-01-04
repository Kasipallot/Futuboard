import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Board } from '../types';

export const boardsApi = createApi({
    reducerPath: 'boardsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000/'}), //json server (npm run server)
    tagTypes: ['Boards'],
    endpoints: (builder) => ({
        getBoard : builder.query<Board, string>({
            query: (boardId) => `boards/${boardId}/`,
            providesTags: ['Boards']
        }),
        addBoard: builder.mutation<Board, Board>({
            query: (board) => ({
                url: 'boards',
                method: 'POST',
                body: board
            }),
            invalidatesTags: ['Boards']
        })
    }),
})

export const { useGetBoardQuery, useAddBoardMutation } = boardsApi;
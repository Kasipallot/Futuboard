import { Board } from '../types';

import {v4 as uuidv4} from 'uuid';

export const getId = (): string => {
    return uuidv4();
}

export const getBoardData = (id: string) => {
    const item = localStorage.getItem(id);
    return item ? JSON.parse(item) : null; // Return null or a default value if item is null
}

export const addBoard = (board: Board, id: string) => {
    localStorage.setItem(id, JSON.stringify(board))
}
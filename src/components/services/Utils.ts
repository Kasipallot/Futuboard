import {v4 as uuidv4} from 'uuid';


export const getId = (): string => {
    return uuidv4();
}

export const getBoardData = (id: string) => {
    return JSON.parse(localStorage.getItem(id));
    
}

export const addBoard = (board, id) => {
    localStorage.setItem(id, JSON.stringify(board))
}
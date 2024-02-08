export type Board = {
    id: string;
    title: string;
    password: string;
    columns: Column[];
    users: User[];
};

export type Column = {
    columnid: string;
    title: string;
    boardid: string;
};

export type ColumnData = {
    columnTitle: string;
};

export type Task = {
    ticketid: string;
    title: string;
    description?: string;
    color?: string;
    caretakers?: User[];
    size?: number;
    columnid: string;
};

export type User = {
    userid: string;
    name: string;
    color?: string;
};

export type NewBoardFormData = {
    title: string;
    password: string;
}


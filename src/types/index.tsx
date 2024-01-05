export type Board = {
    id: string;
    title: string;
    columns: Column[];
    users: User[];
};

export type Column = {
    columnid: string;
    title: string;
};

export type Task = {
    ticketid: string;
    title: string;
    description?: string;
    color?: string;
    caretakers?: User[];
    size?: string;
};

export type User = {
    id: string;
    name: string;
    color?: string;
};



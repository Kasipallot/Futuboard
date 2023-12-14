export type Board = {
    id: string;
    title: string;
    columns: Column[];
    users: User[];
}; 

export type Column = {
    id: string;
    title: string;
    tasks: Task[];
};

export type Task = {
    id: string;
    title: string;
    description: string;
    color?: string;
};

export type User = {
    id: string;
    name: string;
    color?: string;
};



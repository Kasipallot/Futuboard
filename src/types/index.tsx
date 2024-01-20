export type Board = {
    id: string;
    title: string;
    columns: Column[];
}; // add list of users later

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

export type Record = {
    id: string;
    title: string;
    description?: string;
    caption?: string;
    color?: string;
    createdAt?: string;
  };


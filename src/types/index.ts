export type Status = 'todo' | 'in-progress' | 'done';

export interface Project {
    name: string;
    description: string;
    _id: string;
    tasks: Task[];
}

export interface Task {
    _id: string;
    project: string;
    title: string;
    description: string;
    status: Status;
}


export interface User {
    _id: string;
    username: string;
    email: string;
    githubId?: string;
}
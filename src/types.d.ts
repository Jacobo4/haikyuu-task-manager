export enum Status {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed',
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    isVisible: boolean;
}
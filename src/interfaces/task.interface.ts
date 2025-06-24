export interface TaskCreateBody {
    title: string;
    description?: string;
    priority?: number;
    userId: number;
}
export interface TaskUpdateBody {
    title?: string;
    description?: string;
    status?: string;
    priority?: number;
}

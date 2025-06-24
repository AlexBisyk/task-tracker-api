export interface TaskCreateBody {
    title: string;
    description?: string;
    priority?: number;
    userId: number;
}

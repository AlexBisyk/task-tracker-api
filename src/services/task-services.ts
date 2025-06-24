import { db } from '../db/client';
import { TASKS } from '../db/schema';
import type { TaskCreateBody } from '../interfaces/task.interface';

export const getAllTasksService = async () => {
    return db.select().from(TASKS);
};

export const createTaskService = async (taskData: TaskCreateBody) => {
    const [newTask] = await db.insert(TASKS).values(taskData).returning();
    return newTask;
};

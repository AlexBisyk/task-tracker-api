import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { TASKS, USERS } from '../db/schema';
import type {
    TaskCreateBody,
    TaskUpdateBody,
} from '../interfaces/task.interface';

export const getAllTasksService = async () => {
    return db.select().from(TASKS);
};

export const createTaskService = async (taskData: TaskCreateBody) => {
    const [newTask] = await db.insert(TASKS).values(taskData).returning();
    return newTask;
};

export const updateTaskService = async (
    taskId: number,
    taskData: TaskUpdateBody
) => {
    const [updatedTask] = await db
        .update(TASKS)
        .set(taskData)
        .where(eq(TASKS.id, taskId))
        .returning();
    return updatedTask;
};

export const getSingleTaskService = async (taskId: string) => {
    const numId = Number(taskId);
    const [task] = await db.select().from(TASKS).where(eq(TASKS.id, numId));
    return task;
};

export const deleteSingleTaskService = async (taskId: string) => {
    const numId = Number(taskId);
    const [task] = await db
        .delete(TASKS)
        .where(eq(TASKS.id, numId))
        .returning();
    return task;
};

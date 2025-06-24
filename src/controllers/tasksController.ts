import { FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../db/client'; // модуль з підключенням до бази
import { TASKS } from '../db/schema'; // схема Drizzle
import type { TaskCreateBody } from '../interfaces/task.interface'; // типи

export const getAllTasks = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const tasksRes = await db.select().from(TASKS);
        rep.send(tasksRes);
    } catch (error) {
        console.error('DB query error:', error);
    }
};

export const createTask = async (
    req: FastifyRequest<{ Body: TaskCreateBody }>,
    rep: FastifyReply
) => {
    try {
        const taskReq = req.body as TaskCreateBody;
        const returnedTask = await db.insert(TASKS).values(taskReq).returning();
        return rep.status(201).send(returnedTask);
    } catch (error) {
        console.error('Insert error:', error);
        return rep.code(500).send({ error: 'Failed to insert tasks' });
    }
};

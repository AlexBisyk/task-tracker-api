import { FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../db/client'; // модуль з підключенням до бази
import { TASKS } from '../db/schema'; // схема Drizzle
import type { TaskCreateBody } from '../interfaces/task.interface'; // типи
import {
    getAllTasksService,
    createTaskService,
} from '../services/task-services';

export const getAllTasks = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const tasksRes = await getAllTasksService();
        rep.send(tasksRes);
    } catch (error) {
        console.error('DB query error:', error);
        return rep.code(500).send({
            status: 'error',
            message: 'Failed to fetch tasks',
        });
    }
};

export const createTask = async (
    req: FastifyRequest<{ Body: TaskCreateBody }>,
    rep: FastifyReply
) => {
    try {
        const task = await createTaskService(req.body);
        return rep.code(201).send({
            status: 'success',
            message: 'Task created',
            data: task,
        });
    } catch (error) {
        console.error('Insert error:', error);
        return rep.code(500).send({
            status: 'error',
            message: 'Failed to create task',
        });
    }
};

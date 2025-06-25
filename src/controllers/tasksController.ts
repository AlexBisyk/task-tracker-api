import { FastifyReply, FastifyRequest } from 'fastify';
import type {
    TaskCreateBody,
    TaskUpdateBody,
} from '../interfaces/task.interface';
import {
    getAllTasksService,
    createTaskService,
    updateTaskService,
    getSingleTaskService,
} from '../services/task-services';
import { errorReply, successReply } from '../utils/replies';

export const getAllTasks = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const tasksRes = await getAllTasksService();
        rep.send(tasksRes);
    } catch (error) {
        console.error('DB query error:', error);
        return errorReply(rep, 500, 'Failed to fetch tasks');
    }
};

export const getSingleTask = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    rep: FastifyReply
) => {
    try {
        const taskId = req.params.id;
        const task = await getSingleTaskService(taskId);
        if (!task) {
            return errorReply(rep, 404, 'No task with such id');
        }
        rep.send(task);
    } catch (error) {
        console.error('DB query error:', error);
        return errorReply(rep, 500, 'Failed to fetch task');
    }
};
export const createTask = async (
    req: FastifyRequest<{ Body: TaskCreateBody }>,
    rep: FastifyReply
) => {
    try {
        const task = await createTaskService(req.body);
        return successReply(rep, 201, 'Task created', task);
    } catch (error) {
        console.error('Insert error:', error);
        errorReply(rep, 500, 'Failed to create task');
    }
};

export const updateTask = async (
    req: FastifyRequest<{ Params: { id: string }; Body: TaskUpdateBody }>,
    rep: FastifyReply
) => {
    try {
        const task = req.body;
        const numId = Number(req.params.id);
        if (isNaN(numId)) {
            return errorReply(rep, 400, 'Invalid task ID');
        }
        const updTask = await updateTaskService(numId, task);
        if (!updTask) {
            return errorReply(rep, 404, 'Task not found');
        }
        return successReply(rep, 200, 'Task updated', updTask);
    } catch (error) {
        console.error('Insert error:', error);
        errorReply(rep, 500, 'Failed to update task');
    }
};

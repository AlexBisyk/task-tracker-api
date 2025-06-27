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
    deleteSingleTaskService,
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
        const taskId = Number(req.params.id);
        if (isNaN(taskId)) {
            return errorReply(rep, 400, 'Invalid task ID');
        }
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
        const taskId = Number(req.params.id);
        if (isNaN(taskId)) {
            return errorReply(rep, 400, 'Invalid task ID');
        }
        const updTask = await updateTaskService(taskId, task);
        if (!updTask) {
            return errorReply(rep, 404, 'Task not found');
        }
        return successReply(rep, 200, 'Task updated', updTask);
    } catch (error) {
        console.error('Insert error:', error);
        errorReply(rep, 500, 'Failed to update task');
    }
};

export const deleteSingleTask = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    rep: FastifyReply
) => {
    try {
        const taskId = Number(req.params.id);
        if (isNaN(taskId)) {
            return errorReply(rep, 400, 'Invalid task ID');
        }
        const delTask = await deleteSingleTaskService(taskId);
        if (!delTask) {
            return errorReply(rep, 404, 'No task with such id');
        }
        return successReply(rep, 200, 'Task deleted', delTask);
    } catch (error) {
        console.error('Delete error:', error);
        return errorReply(rep, 500, 'Failed to delete task');
    }
};

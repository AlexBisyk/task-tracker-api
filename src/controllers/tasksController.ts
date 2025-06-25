import { FastifyReply, FastifyRequest } from 'fastify';
import type {
    TaskCreateBody,
    TaskUpdateBody,
} from '../interfaces/task.interface';
import {
    getAllTasksService,
    createTaskService,
    updateTaskService,
    getSingleUserService,
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

export const getSingleTask = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    rep: FastifyReply
) => {
    try {
        const taskId = req.params.id;
        const task = await getSingleUserService(taskId);
        if (!task) {
            return rep.code(404).send({
                status: 'failed',
                message: 'No task with such id',
            });
        }
        rep.send(task);
    } catch (error) {
        console.error('DB query error:', error);
        return rep.code(500).send({
            status: 'error',
            message: 'Failed to fetch task',
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

export const updateTask = async (
    req: FastifyRequest<{ Params: { id: string }; Body: TaskUpdateBody }>,
    rep: FastifyReply
) => {
    try {
        const task = req.body;
        const numId = Number(req.params.id);
        if (isNaN(numId)) {
            return rep.code(400).send({
                status: 'error',
                message: 'Invalid task ID',
            });
        }
        const updTask = await updateTaskService(numId, task);
        if (!updTask) {
            return rep.code(404).send({
                status: 'error',
                message: 'Task not found',
            });
        }
        return rep.code(200).send({
            status: 'success',
            message: 'Task updated',
            data: updTask,
        });
    } catch (error) {
        console.error('Insert error:', error);
        return rep.code(500).send({
            status: 'error',
            message: 'Failed to update task',
        });
    }
};

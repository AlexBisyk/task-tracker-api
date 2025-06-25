import { FastifyInstance } from 'fastify';
import {
    getAllTasks,
    createTask,
    updateTask,
    getSingleTask,
} from '../controllers/tasksController';
import { createTaskSchema, updateTaskSchema } from '../schemas/task-schema';

export default async function tasksRoutes(fastify: FastifyInstance) {
    fastify.get('/tasks', getAllTasks);
    fastify.get('/tasks/:id', getSingleTask);
    fastify.post('/tasks', { schema: createTaskSchema, handler: createTask });
    fastify.patch('/tasks/:id', {
        schema: updateTaskSchema,
        handler: updateTask,
    });
}

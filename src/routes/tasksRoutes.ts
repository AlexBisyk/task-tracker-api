import { FastifyInstance } from 'fastify';
import {
    getAllTasks,
    createTask,
    updateTask,
} from '../controllers/tasksController';
import { createTaskSchema, updateTaskSchema } from '../schemas/task-schema';

export default async function tasksRoutes(fastify: FastifyInstance) {
    fastify.get('/tasks', getAllTasks);
    fastify.post('/tasks', { schema: createTaskSchema, handler: createTask });
    fastify.put('/tasks/:id', {
        schema: updateTaskSchema,
        handler: updateTask,
    });
}

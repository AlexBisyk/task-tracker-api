import { FastifyInstance } from 'fastify';
import { getAllTasks, createTask } from '../controllers/tasksController';
import { createTaskSchema } from '../schemas/task-schema';

export default async function tasksRoutes(fastify: FastifyInstance) {
    fastify.get('/tasks', getAllTasks);
    fastify.post('/tasks', { schema: createTaskSchema, handler: createTask });
}

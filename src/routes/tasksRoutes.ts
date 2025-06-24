import { FastifyInstance } from 'fastify';
import { getAllTasks, createTask } from '../controllers/tasksController';

export async function tasksRoutes(fastify: FastifyInstance) {
    fastify.get('/tasks', getAllTasks);
    fastify.post('/tasks', createTask);
}

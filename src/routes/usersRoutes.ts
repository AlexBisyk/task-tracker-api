import { FastifyInstance } from 'fastify';
import { createUser, getAllUsers } from '../controllers/usersController';

export async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users', getAllUsers);
    fastify.post('/users', createUser);
}

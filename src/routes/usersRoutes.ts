import { FastifyInstance } from 'fastify';
import { createUser, getAllUsers } from '../controllers/usersController';
import { createUserSchema } from '../schemas/user-schema';

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users', getAllUsers);
    fastify.post('/users', { schema: createUserSchema, handler: createUser });
}

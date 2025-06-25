import { FastifyRequest, FastifyReply } from 'fastify';
import { UserCreateBody } from '../interfaces/user.interface';
import {
    getAllUsersService,
    createUserService,
    getSingleUserService,
} from '../services/user-services';

export const getAllUsers = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const users = await getAllUsersService();
        rep.send(users);
    } catch (error) {
        console.error('DB query error:', error);
        return rep.code(500).send({ error: 'Failed to fetch users' });
    }
};
export const getSingleUser = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    rep: FastifyReply
) => {
    try {
        const userId = req.params.id;
        const user = await getSingleUserService(userId);
        if (!user) {
            return rep.code(404).send({
                status: 'failed',
                message: 'No user with such id',
            });
        }
        rep.send(user);
    } catch (error) {
        console.error('DB query error:', error);
        return rep.code(500).send({ error: 'Failed to fetch user' });
    }
};

export const createUser = async (
    req: FastifyRequest<{ Body: UserCreateBody }>,
    rep: FastifyReply
) => {
    try {
        const user = createUserService(req.body);
        return rep.code(201).send({
            status: 'success',
            message: 'User created',
            data: user,
        });
    } catch (error) {
        console.error('Insert error:', error);
        return rep.code(500).send({
            status: 'error',
            message: 'Failed to create user',
        });
    }
};

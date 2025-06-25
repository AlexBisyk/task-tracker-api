import { FastifyRequest, FastifyReply } from 'fastify';
import { UserCreateBody } from '../interfaces/user.interface';
import {
    getAllUsersService,
    createUserService,
    getSingleUserService,
} from '../services/user-services';
import { errorReply, successReply } from '../utils/replies';

export const getAllUsers = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const users = await getAllUsersService();
        rep.send(users);
    } catch (error) {
        console.error('DB query error:', error);
        return errorReply(rep, 500, 'Failed to fetch users');
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
            return errorReply(rep, 404, 'No user with such id');
        }
        rep.send(user);
    } catch (error) {
        console.error('DB query error:', error);
        return errorReply(rep, 500, 'Failed to fetch user');
    }
};

export const createUser = async (
    req: FastifyRequest<{ Body: UserCreateBody }>,
    rep: FastifyReply
) => {
    try {
        const user = createUserService(req.body);
        return successReply(rep, 201, 'User created', user);
    } catch (error) {
        console.error('Insert error:', error);
        return errorReply(rep, 500, 'Failed to create user');
    }
};

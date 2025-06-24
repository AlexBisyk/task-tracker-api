import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db/client';
import { USERS } from '../db/schema';
import { UserCreateBody } from '../interfaces/user.interface';

export const getAllUsers = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const allUsers = await db.select().from(USERS);
        rep.send(allUsers);
    } catch (error) {
        console.error('DB error, cannot select all users:', error);
        return rep
            .status(500)
            .send({ error: 'DB error, cannot select all users' });
    }
};

export const createUser = async (
    req: FastifyRequest<{ Body: UserCreateBody }>,
    rep: FastifyReply
) => {
    try {
        const user = req.body as UserCreateBody;
        const returnedUser = await db.insert(USERS).values(user).returning();
        rep.code(201).send(returnedUser);
    } catch (error) {
        console.error('Insert error:', error);
        return rep.code(500).send({ error: 'Failed to insert users' });
    }
};

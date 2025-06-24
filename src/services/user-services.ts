import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { USERS } from '../db/schema';
import type { UserCreateBody } from '../interfaces/user.interface';

export const getAllUsersService = async () => {
    return db.select().from(USERS);
};

export const createUserService = async (userData: UserCreateBody) => {
    const [user] = await db.insert(USERS).values(userData).returning();
    return user;
};

export const getSingleUserService = async (id: string) => {
    const userId = Number(id);
    const [user] = await db.select().from(USERS).where(eq(USERS.id, userId));
    return user;
};

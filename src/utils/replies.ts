import { FastifyReply } from 'fastify';

export const errorReply = (
    rep: FastifyReply,
    code: number,
    message: string,
    data?: unknown
) => {
    return rep.code(code).send({
        status: 'error',
        message: message,
        ...(data !== undefined && { data }),
    });
};

export const successReply = (
    rep: FastifyReply,
    code: number,
    message: string,
    data?: unknown
) => {
    return rep.code(code).send({
        status: 'success',
        message: message,
        ...(data !== undefined && { data }),
    });
};

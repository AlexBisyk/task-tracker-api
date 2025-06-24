export const createUserSchema = {
    body: {
        type: 'object',
        required: ['email'],
        properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
        },
    },
    response: {
        201: {
            type: 'object',
            properties: {
                status: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

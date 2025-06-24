export const createTaskSchema = {
    body: {
        type: 'object',
        required: ['title', 'userId'],
        properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            priority: { type: 'number' },
            userId: { type: 'number' },
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

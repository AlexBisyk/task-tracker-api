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
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        status: { type: 'string' },
                        priority: { type: 'number' },
                        userId: { type: 'number' },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                    required: ['id', 'title', 'userId', 'createdAt'],
                },
            },
            required: ['status', 'message', 'data'],
        },
    },
};

export const updateTaskSchema = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            priority: { type: 'number' },
            userId: { type: 'number' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' },
                message: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        status: { type: 'string' },
                        priority: { type: 'number' },
                        userId: { type: 'number' },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                    required: ['id', 'title', 'userId', 'createdAt'],
                },
            },
            required: ['status', 'message', 'data'],
        },
    },
};

import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

export async function registerSwagger(fastify: FastifyInstance) {
    await fastify.register(swagger, {
        swagger: {
            info: {
                title: 'Task Tracker API',
                description: 'API documentation',
                version: '1.0.0',
            },
        },
    });

    await fastify.register(swaggerUI, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },
    });
}

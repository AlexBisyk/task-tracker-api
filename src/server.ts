import * as dotenv from 'dotenv';
dotenv.config();
import fastify from 'fastify';
import tasksRoutes from './routes/tasksRoutes';
import userRoutes from './routes/usersRoutes';
import { registerSwagger } from './plugins/swagger';

async function bootstrap() {
    const app = fastify();

    await registerSwagger(app);

    app.register(tasksRoutes);
    app.register(userRoutes);

    app.listen({ port: 3000 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
}
bootstrap();

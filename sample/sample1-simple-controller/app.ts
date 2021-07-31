import 'reflect-metadata';
import 'dotenv/config';
import { buildBot } from '../../src';
import { Container } from 'typedi';

const vk = buildBot({
    token: process.env.TOKEN,
    pollingGroupId: Number(process.env.GROUP_ID),
    container: Container,
    controllers: [__dirname + '/controllers/**.ts'],
    middlewares: [__dirname + '/middlewares/**.ts'],
});

async function bootstrap() {
    try {
        await vk.updates.start();
        console.log('[Bot] Started');
    } catch (err) {
        console.error('[Bot] Error', err);
    }
}
bootstrap();

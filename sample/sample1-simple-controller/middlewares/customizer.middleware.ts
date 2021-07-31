import { Service } from 'typedi';
import { Container, HearManager, Middleware, IMiddleware } from '../../../src';

@Middleware({ rawEvents: 'message_new', priority: 1 })
@Service()
export class CustomizerMiddleware implements IMiddleware {
    middleware(ctx: any, next: any) {
        console.log('🚀 ~ file: customizer.middleware.ts ~ CustomizerMiddleware ~ middleware ~ ctx.text', ctx.text);
        ctx.text += ' [WORK]';
        next();
    }
}

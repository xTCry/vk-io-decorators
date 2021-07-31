import { Service } from 'typedi';
import { Container, HearManager, Middleware, IMiddleware } from '../../../src';

@Middleware({ rawEvents: 'message_new' })
@Service()
export class HearMiddleware implements IMiddleware {
    middleware(ctx: any, next: any) {
        console.log('🚀 ~ file: hear.middleware.ts ~ HearMiddleware ~ middleware()');
        const hearManager = Container.getContainer().get(HearManager);
        return hearManager.middleware(ctx, next);
    }
}

import { Middleware } from 'middleware-io';

export interface IMiddleware<C = any> {
    middleware: Middleware<C>;
}

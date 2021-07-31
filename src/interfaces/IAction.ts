import { NextMiddleware } from 'middleware-io';
import { Context } from 'vk-io';

export interface IAction {
    context: Context & any;
    next: () => NextMiddleware;
}

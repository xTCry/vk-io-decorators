import { ContextTypes, ContextSubTypes } from 'vk-io';
import { AllowArray } from 'vk-io/lib/types';
import { getMetadataArgsStorage } from '../metadata-builder/MetadataArgsStorage';

/**
 * Marks given class as a middleware.
 * Allows to create global middlewares and control order of middleware execution.
 */
export function Middleware(options: {
    type?: 'after' | 'before';
    priority?: number;
    rawEvents?: AllowArray<ContextTypes | ContextSubTypes>;
}): Function {
    return function (target: Function) {
        getMetadataArgsStorage().middlewares.push({
            target: target,
            type: options?.type || 'before',
            global: true,
            priority: options?.priority ?? 0,
            rawEvents: options?.rawEvents,
        });
    };
}

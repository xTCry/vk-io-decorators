import { ContextPossibleTypes } from 'vk-io';
import { AllowArray } from 'vk-io/lib/types';

/**
 * Metadata used to store registered middlewares.
 */
export interface MiddlewareMetadataArgs {
    /**
     * Object class of the middleware class.
     */
    target?: Function;

    /**
     * Indicates if this middleware is global, thous applied to all events.
     */
    global: boolean;

    /**
     * Execution priority of the middleware.
     */
    priority: number;

    /**
     * Indicates if middleware must be executed after events action is executed.
     */
    type: 'before' | 'after';

    rawEvents?: AllowArray<ContextPossibleTypes>;
}

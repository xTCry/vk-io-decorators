import { IAction, IMiddleware } from '../interfaces';
import { getFromContainer } from '../container';
import { MiddlewareMetadataArgs } from './args/MiddlewareMetadataArgs';

/**
 * Middleware metadata.
 */
export class MiddlewareMetadata {
    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    /**
     * Indicates if this middleware is global, thous applied to all routes.
     */
    global: boolean;

    /**
     * Object class of the middleware class.
     */
    target: Function | any;

    /**
     * Execution priority of the middleware.
     */
    priority: number;

    /**
     * Indicates if middleware must be executed after routing action is executed.
     */
    type: 'before' | 'after';

    /**
     * 
     */
    rawEvents?: MiddlewareMetadataArgs['rawEvents'];

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(args: MiddlewareMetadataArgs) {
        this.global = args.global;
        this.target = args.target;
        this.priority = args.priority;
        this.type = args.type;
        this.rawEvents = args.rawEvents;
    }

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    /**
     * Gets middleware instance from the container.
     */
    getInstance(action?: IAction) {
        return getFromContainer<IMiddleware>(this.target, action);
    }
}

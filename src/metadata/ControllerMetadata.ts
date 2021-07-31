import { getFromContainer } from '../container';
import { IAction } from '../interfaces/IAction';
import { ActionMetadata } from './ActionMetadata';
import { ControllerMetadataArgs } from './args/ControllerMetadataArgs';

// export interface ComposerOptions {
//     type: 'controller' | 'scene' | 'wizard' | 'any';
//     data: any;
//     middlewares?: {new (...args: any[]) : TFIMiddleware}[]
// }

export class ControllerMetadata {
    type: ControllerMetadataArgs['type'];

    target: ControllerMetadataArgs['target'];

    data: ControllerMetadataArgs['data'];

    /**
     * Controller actions.
     */
    actions: ActionMetadata[] = [];

    constructor(args: ControllerMetadataArgs) {
        this.target = args.target;
        this.type = args.type;
        this.data = args.data;
    }

    getInstance(action?: IAction) {
        return getFromContainer(this.target, action) as any;
    }
}

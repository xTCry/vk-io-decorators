import { IAction } from '../interfaces/IAction';
import { ActionMetadataArgs } from './args/ActionMetadataArgs';
import { ControllerMetadata } from './ControllerMetadata';
import { ParamMetadata } from './ParamMetadata';

/**
 * Action metadata.
 */
export class ActionMetadata {
    type: ActionMetadataArgs['type'];

    target: ActionMetadataArgs['target'];

    method: ActionMetadataArgs['method'];

    data: ActionMetadataArgs['data'];

    rawEvents: ActionMetadataArgs['rawEvents'];

    /**
     * Action's parameters.
     */
    params: ParamMetadata[] = [];

    /**
     * Action's controller.
     */
    controllerMetadata: ControllerMetadata;

    constructor(controllerMetadata: ControllerMetadata, args: ActionMetadataArgs) {
        this.type = args.type;
        this.target = args.target;
        this.method = args.method;
        this.data = args.data;
        this.rawEvents = args.rawEvents;

        this.controllerMetadata = controllerMetadata;

        // this.options = args.options;

        // this.appendParams = args.appendParams;
        // this.methodOverride = args.methodOverride;
    }

    /**
     * Calls action method.
     * Action method is an action defined in a user controller.
     */
    callMethod(params: any[], action: IAction) {
      const controllerInstance = this.controllerMetadata.getInstance(action);
      return controllerInstance[this.method].apply(controllerInstance, params);
    }
}

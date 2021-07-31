import { ActionMetadata } from './ActionMetadata';
import { ParamMetadataArgs } from './args/ParamMetadataArgs';

/**
 * Action Parameter metadata.
 */
export class ParamMetadata {
    /**
     * Parameter's action.
     */
    actionMetadata: ActionMetadata;

    /**
     * Parameter target type.
     */
    targetType?: any;

    /**
     * Parameter target.
     */
    target: Object;

    /**
     * Object on which's method's parameter this parameter is attached.
     */

    object: ParamMetadataArgs['object'];

    /**
     * Method on which's parameter is attached.
     */
    method: ParamMetadataArgs['method'];

    /**
     * Index (# number) of the parameter in the method signature.
     */
    index: ParamMetadataArgs['index'];

    /**
     * Parameter name.
     */
    name?: ParamMetadataArgs['name'];

    handler: ParamMetadataArgs['handler'];

    constructor(actionMetadata: ActionMetadata, args: ParamMetadataArgs) {
        this.actionMetadata = actionMetadata;

        this.target = args.object.constructor;
        this.method = args.method;
        this.index = args.index;
        this.handler = args.handler;

        // this.type = args.type;
        this.name = args.name;

        if (args.explicitType) {
            this.targetType = args.explicitType;
        } else {
            const paramTypes = Reflect.getMetadata('design:paramtypes', args.object, args.method as string);
            if (typeof paramTypes !== 'undefined') {
                this.targetType = paramTypes[args.index];
            }
        }
    }
}

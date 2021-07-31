import { IAction } from '../../interfaces/IAction';
import { ParamType } from '../../interfaces/ParamType';

/**
 * Controller metadata used to storage information about registered parameters.
 */
export interface ParamMetadataArgs {
    handler: (context: IAction['context'], next: IAction['next']) => any;

    /**
     * Parameter type.
     */
    type: ParamType;

    /**
     * Parameter object.
     */
    object: any;

    /**
     * Method on which's parameter is attached.
     */
    method: PropertyKey;

    /**
     * Index (# number) of the parameter in the method signature.
     */
    index: number;

    /**
     * Parameter name.
     */
    name?: string;

    /**
     * Explicitly set type which should be used for Body to perform transformation.
     */
    explicitType?: any;
}

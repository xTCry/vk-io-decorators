import { ContextPossibleTypes } from 'vk-io';
import { AllowArray } from 'vk-io/lib/types';

export type ActionType = 'hear' | 'on';

export interface ActionMetadataArgs {
    /**
     * Action type. Can be one of the value defined in ActionTypes
     * class.
     */
    type: ActionType;

    /**
     * Class on which's method this action is attached.
     */
    target: any;

    /**
     * Object's method that will be executed on this action.
     */
    method: PropertyKey;

    data?: any;

    rawEvents?: AllowArray<ContextPossibleTypes>;
}

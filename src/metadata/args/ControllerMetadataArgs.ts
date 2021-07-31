export type ControllerType = 'controller' | 'scene' | 'wizard' | 'any';

/**
 * Controller metadata used to storage information about registered controller.
 */
export interface ControllerMetadataArgs {
    /**
     * Controller type.
     */
    type: ControllerType;
    
    /**
     * Indicates object which is used by this controller.
     */
    target: any;

    /**
     * Data that apply to all controller actions.
     */
    data?: any;
}

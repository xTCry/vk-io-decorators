import { Composer } from 'vk-io';
import { getMetadataArgsStorage } from '../metadata-builder/MetadataArgsStorage';

/**
 * Defines a class as a controller.
 * Each decorated controller method is served as a controller action.
 * Controller actions are executed when request come.
 *
 * @param options Extra options that apply to all controller actions
 */
export function Controller(composer?: Composer<any, any>): Function {
    return function (target: Function) {
        getMetadataArgsStorage().controllers.push({
            type: 'controller',
            target,
            data: { composer },
        });
    };
}

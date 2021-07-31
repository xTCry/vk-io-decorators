import { getMetadataArgsStorage } from '../metadata-builder/MetadataArgsStorage';

/**
 * Defines a class as a controller.
 * Each decorated controller method is served as a controller action.
 * Controller actions are executed when request come.
 *
 * @param match ...
 */
export function Hears(match: string | RegExp): Function {
    return function (target: Object, methodName: PropertyKey, descriptor: PropertyDescriptor) {
        getMetadataArgsStorage().actions.push({
            type: 'hear',
            target: target.constructor,
            method: methodName,
            data: [match],  
        });
        return descriptor;
    };
}

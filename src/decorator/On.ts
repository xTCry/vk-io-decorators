import { ContextTypes, ContextSubTypes } from 'vk-io';
import { AllowArray } from 'vk-io/lib/types';
import { getMetadataArgsStorage } from '../metadata-builder/MetadataArgsStorage';

/**
 * Defines a class as a controller.
 * Each decorated controller method is served as a controller action.
 * Controller actions are executed when request come.
 *
 * @param match ...
 */
export function On(rawEvents: AllowArray<ContextTypes | ContextSubTypes>): Function {
    return function (target: Object, methodName: PropertyKey, descriptor: PropertyDescriptor) {
        getMetadataArgsStorage().actions.push({
            type: 'on',
            target: target.constructor,
            method: methodName,
            rawEvents,
        });
        return descriptor;
    };
}

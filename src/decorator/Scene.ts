import { getMetadataArgsStorage } from '../metadata-builder/MetadataArgsStorage';

/**
 * Defines a class as a controller.
 * Each decorated controller method is served as a controller action.
 * Controller actions are executed when request come.
 *
 * @param scene Scene name
 */
export function Scene(scene?: string): Function {
    return function (target: Function) {
        getMetadataArgsStorage().controllers.push({
            type: 'scene',
            target,
            data: { scene },
        });
    };
}

import { getMetadataArgsStorage } from '../../metadata-builder/MetadataArgsStorage';

export function Context(): Function {
    return function (target: Object, methodName: PropertyKey, index: number) {
        getMetadataArgsStorage().params.push({
            type: 'context',
            object: target,
            method: methodName,
            index: index,
            handler: (ctx) => ctx,
        });
    };
}

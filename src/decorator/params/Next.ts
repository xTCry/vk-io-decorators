import { getMetadataArgsStorage } from '../../metadata-builder/MetadataArgsStorage';

export function Next(): Function {
    return function (target: Object, methodName: PropertyKey, index: number) {
        getMetadataArgsStorage().params.push({
            type: 'next',
            object: target,
            method: methodName,
            index: index,
            handler: (ctx, next) => next,
        });
    };
}

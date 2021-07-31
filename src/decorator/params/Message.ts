import { MessageContext } from 'vk-io';
import { getMetadataArgsStorage } from '../../metadata-builder/MetadataArgsStorage';

export function Message(): Function {
    return function (target: Object, methodName: PropertyKey, index: number) {
        getMetadataArgsStorage().params.push({
            type: 'message',
            object: target,
            method: methodName,
            index: index,
            handler: (ctx: MessageContext) => (ctx.text),
        });
    };
}

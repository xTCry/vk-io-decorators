import { VK } from 'vk-io';
import { HearManager } from '@vk-io/hear';
import { getContainer, useContainer } from './container';
import { IBotOptions } from './interfaces';
import { MetadataBuilder } from './metadata-builder/MetadataBuilder';
import { importClassesFromDirectories } from './util/importClassesFromDirectories';

export function buildBot(options: IBotOptions) {
    if (options.container) {
        useContainer(options.container);
    }

    const vk = options.vk || new VK({ token: options.token!, pollingGroupId: options.pollingGroupId });
    const hearManager = options.hearManager || new HearManager();

    getContainer().set(VK, vk);
    getContainer().set(HearManager, hearManager);

    // import all controllers and middlewares and error handlers (new way)
    let controllerClasses: Function[] | undefined;
    if (options?.controllers?.length) {
        controllerClasses = (options.controllers as any[]).filter((controller) => controller instanceof Function);
        const controllerDirs = (options.controllers as any[]).filter((controller) => typeof controller === 'string');
        controllerClasses.push(...importClassesFromDirectories(controllerDirs));
    }

    let middlewareClasses: Function[] | undefined;
    if (options?.middlewares?.length) {
        middlewareClasses = (options.middlewares as any[]).filter((controller) => controller instanceof Function);
        const middlewareDirs = (options.middlewares as any[]).filter((controller) => typeof controller === 'string');
        middlewareClasses.push(...importClassesFromDirectories(middlewareDirs));
    }

    // etc...

    new MetadataBuilder()
        .initialize()
        .registerMiddlewares('before', middlewareClasses)
        .registerControllers(controllerClasses)
        .registerMiddlewares('after', middlewareClasses);

    return vk;
}

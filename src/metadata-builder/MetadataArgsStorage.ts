import { ActionMetadataArgs } from '../metadata/args/ActionMetadataArgs';
import { ControllerMetadataArgs } from '../metadata/args/ControllerMetadataArgs';
import { MiddlewareMetadataArgs } from '../metadata/args/MiddlewareMetadataArgs';
import { ParamMetadataArgs } from '../metadata/args/ParamMetadataArgs';

/**
 * Storage all metadatas read from decorators.
 */
class MetadataArgsStorage {
    /**
     * Registered controller metadata args.
     */
    public controllers: ControllerMetadataArgs[] = [];
    // public composerMetadata: ComposerMetadata[] = [];

    /**
     * Registered action metadata args.
     */
    public actions: ActionMetadataArgs[] = [];
    // public handlers: HandlerMetadata[] = [];

    /**
     * Registered middleware metadata args.
     */
    public middlewares: MiddlewareMetadataArgs[] = [];

    /**
     * Registered param metadata args.
     */
    public params: ParamMetadataArgs[] = [];
    // public paramMetadata: ParamsMetadata[] = [];

    /**
     * Removes all saved metadata.
     */
    public reset() {
        this.controllers = [];
        this.actions = [];
        this.middlewares = [];
        this.params = [];

        // this.composerMetadata = [];
        // this.wizardStep = [];
    }

    /**
     * Filters registered middlewares by a given classes.
     */
    filterMiddlewareMetadatasForClasses(classes: Function[]): MiddlewareMetadataArgs[] {
        return (
            classes
                .map((cls) => this.middlewares.find((mid) => mid.target === cls)!)
                // this might be not needed if all classes where decorated with `@Middleware`
                .filter((middleware) => middleware !== undefined)
        );
    }

    /**
     * Filters registered controllers by a given controller classes.
     */
    filterControllerMetadatasForClasses(controllers: Function[]): ControllerMetadataArgs[] {
        return this.controllers.filter((controller) => {
            return controllers.filter((c) => controller.target === c).length > 0;
        });
    }

    /**
     * Filters registered actions by a given classes.
     */
    filterActionsWithTarget(target: Function): ActionMetadataArgs[] {
        return this.actions.filter((action) => action.target === target);
    }

    /**
     * Filters parameters by a given classes.
     */
    filterParamsWithTargetAndMethod(target: Function, methodName: PropertyKey): ParamMetadataArgs[] {
        return this.params.filter((param) => param.object.constructor === target && param.method === methodName);
    }
}

/**
 * Gets metadata args storage.
 * Metadata args storage follows the best practices and stores metadata in a global variable.
 */
export function getMetadataArgsStorage(): MetadataArgsStorage {
    if (!(global as any).controllersMetadataArgsStorage) {
        (global as any).controllersMetadataArgsStorage = new MetadataArgsStorage();
    }
    return (global as any).controllersMetadataArgsStorage;
}

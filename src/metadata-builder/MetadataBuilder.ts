import { Composer, VK } from 'vk-io';
import { AllowArray } from 'vk-io/lib/types';
import { HearManager } from '@vk-io/hear';
import { getContainer } from '../container';
import { IAction } from '../interfaces/IAction';
import { ActionMetadata } from '../metadata/ActionMetadata';
import { ActionMetadataArgs } from '../metadata/args/ActionMetadataArgs';
import { ControllerMetadata } from '../metadata/ControllerMetadata';
import { ParamMetadata } from '../metadata/ParamMetadata';
import { MiddlewareMetadata } from '../metadata/MiddlewareMetadata';
import { getMetadataArgsStorage } from './MetadataArgsStorage';

/**
 * Builds metadata from the given metadata arguments.
 */
export class MetadataBuilder {
    public initialize() {
        return this;
    }

    /**
     * Registers all given controllers and actions from those controllers.
     */
    public registerControllers(classes?: Function[]): this {
        const controllers = this.createControllers(classes);
        for (const controller of controllers) {
            // const composer = new Composer();
            // TODO: foreach middlewares

            for (const actionMetadata of controller.actions) {
                // const interceptorFns = this.prepareInterceptors([
                //     ...this.interceptors,
                //     ...actionMetadata.controllerMetadata.interceptors,
                //     ...actionMetadata.interceptors,
                // ]);

                this.registerAction(actionMetadata, (action: IAction) => {
                    return this.executeAction(actionMetadata, action /* , interceptorFns */);
                });
            }
            // bot.updates.use(composer.compose());
        }

        return this;
    }

    protected registerAction(actionMetadata: ActionMetadata, executeCallback: (options: IAction) => any) {
        const bot = getContainer().get(VK);

        const actionHandler = (context: any, next: any) => executeCallback({ context, next });

        // composer.use
        if (actionMetadata.type === 'on') {
            if (!actionMetadata.rawEvents) {
                throw new Error('for action type [on] need set param rawEvents');
            }

            bot.updates.on(
                actionMetadata.rawEvents as any,
                [...(actionMetadata.data ? actionMetadata.data : []), actionHandler] as AllowArray<any>
            );
        } else if (actionMetadata.type === 'hear') {
            const hearManager = getContainer().get(HearManager);
            hearManager.hear(actionMetadata.data, actionHandler as AllowArray<any>);
        } else {
            // ...
            console.log('actionMetadata.type', actionMetadata.type);
        }
    }

    /**
     * Executes given controller action.
     */
    protected async executeAction(actionMetadata: ActionMetadata, action: IAction, interceptorFns: Function[] = []) {
        // compute all parameters
        const paramsPromises = actionMetadata.params
            .sort((param1, param2) => param1.index - param2.index)
            .map((param) => param.handler(action.context, action.next));

        // after all parameters are computed
        const params = await Promise.all(paramsPromises);

        // execute action and handle result
        const allParams = params;
        const result = actionMetadata.callMethod(allParams, action);
        return result;
    }

    /**
     * Registers post-execution middlewares.
     */
    public registerMiddlewares(type: 'before' | 'after', classes?: Function[]): this {
        this.createMiddlewares(classes)
            .filter((middleware) => middleware.global && middleware.type === type)
            .sort((middleware1, middleware2) => middleware2.priority - middleware1.priority)
            .forEach((middleware) => this.registerMiddleware(middleware));

        return this;
    }

    /**
     * Registers middleware that run before controller actions.
     */
    protected registerMiddleware(middleware: MiddlewareMetadata) {
        const bot = getContainer().get(VK);
        const middlewareWrapper = (context: any, next: any) => {
            return middleware.getInstance({ context, next }).middleware(context, next);
        };

        if (middleware.rawEvents) {
            bot.updates.on(middleware.rawEvents as any, middlewareWrapper);
        } else {
            bot.updates.use(middlewareWrapper);
        }
    }

    /* Creators */

    /**
     * Creates middleware metadatas.
     */
    protected createMiddlewares(classes?: Function[]): MiddlewareMetadata[] {
        const middlewares = !classes
            ? getMetadataArgsStorage().middlewares
            : getMetadataArgsStorage().filterMiddlewareMetadatasForClasses(classes);
        return middlewares.map((middlewareArgs) => new MiddlewareMetadata(middlewareArgs));
    }

    /**
     * Creates controller metadatas.
     */
    protected createControllers(classes?: Function[]) {
        const controllers = !classes
            ? getMetadataArgsStorage().controllers
            : getMetadataArgsStorage().filterControllerMetadatasForClasses(classes);

        return controllers.map((controllerArgs) => {
            const controller = new ControllerMetadata(controllerArgs);
            // controller.build(this.createControllerResponseHandlers(controller));

            controller.actions = this.createActions(controller);
            // controller.uses = this.createControllerUses(controller);
            // controller.interceptors = this.createControllerInterceptorUses(controller);

            return controller;
        });
    }

    protected createActions(controller: ControllerMetadata) {
        const actionsWithTarget: ActionMetadataArgs[] = [];

        let target = controller.target;
        while (target) {
            actionsWithTarget.push(
                ...getMetadataArgsStorage()
                    .filterActionsWithTarget(target)
                    .filter((action) => !actionsWithTarget.map((a) => a.method).includes(action.method))
            );
            target = Object.getPrototypeOf(target);
        }

        return actionsWithTarget.map((actionArgs) => {
            const action = new ActionMetadata(controller, actionArgs);
            // action.options = { ...controller.options, ...actionArgs.options };
            action.params = this.createParams(action);
            // action.uses = this.createActionUses(action);
            // action.interceptors = this.createActionInterceptorUses(action);
            // action.build(this.createActionResponseHandlers(action));
            return action;
        });
    }

    /**
     * Creates param metadatas.
     */
    protected createParams(action: ActionMetadata): ParamMetadata[] {
        return getMetadataArgsStorage()
            .filterParamsWithTargetAndMethod(action.target, action.method)
            .map((paramArgs) => new ParamMetadata(action, paramArgs));
    }
}

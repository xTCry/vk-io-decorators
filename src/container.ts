import { IAction } from "./interfaces/IAction";

export type ClassConstructor<T> = { new (...args: any[]): T };

/**
 * Container options.
 */
export interface ContainerOptions {
    /**
     * If set to true, then default container will be used in the case if given container haven't returned anything.
     */
    fallback?: boolean;

    /**
     * If set to true, then default container will be used in the case if given container thrown an exception.
     */
    fallbackOnErrors?: boolean;
}

/**
 * Allows routing controllers to resolve objects using your IoC container
 */
export interface Container {
    /**
     * Return
     */
    get<T>(someClass: ClassConstructor<T>, action?: IAction): T;
    set<T>(someClass: ClassConstructor<T>, instance: T): void;
}

/**
 * Container to be used by this library for inversion control. If container was not implicitly set then by default
 * container simply creates a new instance of the given class.
 */
const defaultContainer = new (class {
    private instances: { type: Function; object: any }[] = [];

    get<T>(someClass: ClassConstructor<T>): T {
        let instance = this.instances.find((instance) => instance.type === someClass);
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }

        return instance.object;
    }

    set<T>(someClass: ClassConstructor<T>, instance: T) {
        this.instances.push({ type: someClass, object: instance });
    }
})();

let usedContainer: Container;
let usedContainerOptions: ContainerOptions | undefined;

/**
 * Sets container to be used by this library.
 */
export function useContainer(iocAdapter: Container, options?: ContainerOptions) {
    usedContainer = iocAdapter;
    usedContainerOptions = options;
}

/**
 * Gets the IOC container used by this library.
 * @param someClass A class constructor to resolve
 * @param action The context that `someClass` is being resolved for
 */
export function getFromContainer<T>(someClass: ClassConstructor<T>, action?: IAction): T {
    if (usedContainer) {
        try {
            const instance = usedContainer.get(someClass, action);
            if (instance) return instance;

            if (!usedContainerOptions?.fallback) return instance;
        } catch (error) {
            if (!usedContainerOptions?.fallbackOnErrors) throw error;
        }
    }
    return defaultContainer.get<T>(someClass);
}

export function getContainer() {
    if (usedContainer) {
        return usedContainer;
    }
    return defaultContainer;
}

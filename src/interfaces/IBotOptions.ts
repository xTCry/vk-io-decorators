import { VK } from 'vk-io';
import { HearManager } from '@vk-io/hear';
import { Container } from '../container';

export interface IBotOptions {
    container?: Container;

    vk?: VK;
    hearManager?: HearManager<any>;

    /**
     * List of controllers to register in the framework or directories from where to import all your controllers.
     */
    controllers?: Function[] | string[];

    /**
     * List of middlewares to register in the framework or directories from where to import all your middlewares.
     */
    middlewares?: Function[] | string[];

    token?: string;
    pollingGroupId?: number;

    // session?: any;

    // stage?: any;
}

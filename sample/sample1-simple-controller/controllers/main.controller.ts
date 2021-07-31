import { Service } from 'typedi';
import { MessageContext } from 'vk-io';
import { Controller, Context, On, Message, Next, Hears } from '../../../src';

@Controller()
@Service()
export class MainController {
    @On('message_new')
    async onMessageNew(@Context() ctx: MessageContext, @Message() msg: string, @Next() next: any) {
        console.log(
            '🚀 ~ file: main.controller.ts ~ MainController ~ onMessageNew ~ ctx.senderId, ctx.senderType',
            ctx.senderId,
            ctx.senderType
        );
        console.log('🚀 ~ file: main.controller.ts ~ MainController ~ onMessageNew ~ msg', msg);
        ctx.text += ' [POST]';
        next();
    }

    @On('message_new')
    async onMessageNewSecond(@Context() ctx: MessageContext, @Message() msg: string) {
        console.log('🚀 ~ file: main.controller.ts ~ MainController ~ onMessageNewSecond ~ msg', msg);
    }

    @On('message_edit')
    async onMessageEdit(@Context() ctx: MessageContext, @Message() msg: string) {
        console.log(
            '🚀 ~ file: main.controller.ts ~ MainController ~ onMessageEdit ~ ctx.senderId, ctx.senderType',
            ctx.senderId,
            ctx.senderType
        );
        console.log('🚀 ~ file: main.controller.ts ~ MainController ~ onMessageEdit ~ msg', msg);
    }

    // @Hears('hi')
    @Hears(/^hi\s/i)
    async onHear_hi(@Context() ctx: MessageContext, @Message() msg: string) {
        console.log('🚀 ~ file: main.controller.ts ~ MainController ~ onHear_hi ~ msg', msg);
        ctx.reply(`HelloW! - ${msg}`);
    }

    @Hears(/match (?<number>[0-9]+)$/i)
    async onHear_regexp(@Context() ctx: MessageContext, @Message() msg: string) {
        console.log('🚀 ~ file: main.controller.ts ~ MainController ~ onHear_regexp ~ msg, match', msg, ctx.$match);
        ctx.reply(`Number: ${ctx.$match.groups!['number']}`);
    }
}

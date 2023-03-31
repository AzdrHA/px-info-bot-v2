import AbstractEvent from '@abstract/AbstractEvent';
import { type Message } from 'discord.js';
import channelLogRequest from '@/api/ChannelLogRequest';
import { MessageDeleteLogEmbedBuilder } from '@component/embed-builder/log/message/MessageDeleteLogEmbedBuilder';

/**
 * @class MessageDeleteEvent
 * @description The message delete event
 * @extends {AbstractEvent}
 */
export default class MessageDeleteEvent extends AbstractEvent {
  /**
   * @constructor
   * @protected
   * @description The constructor of the message delete event
   * @param {Message} message
   * @returns {Promise<any>}
   */
  public async run(message: Message): Promise<any> {
    if (message.author?.bot) return false;
    if (message.author.id === this.client.user?.id) return false;
    return await this.log({
      channel: (await channelLogRequest.get()).message,
      embed: MessageDeleteLogEmbedBuilder(message)
    });
  }
}

import AbstractEvent from '@abstract/AbstractEvent'
import { type Message } from 'discord.js'
import { MessageUpdateLogEmbedBuilder } from '@component/embed-builder/log/message/MessageUpdateLogEmbedBuilder'
import channelLogRequest from '@/api/ChannelLogRequest'

/**
 * @class MessageUpdateEvent
 * @description The message update event
 * @extends {AbstractEvent}
 */
export default class MessageUpdateEvent extends AbstractEvent {
  /**
   * @constructor
   * @protected
   * @description The constructor of the message update event
   * @param {Message} oldMessage
   * @param {Message} newMessage
   * @returns {Promise<any>}
   */
  public async run (oldMessage: Message, newMessage: Message): Promise<any> {
    // Check if the author is not a bot
    if (newMessage.author?.bot) return false
    // Check if the old and the new message is not empty
    if ((oldMessage.content !== '') && (newMessage.content !== '')) return false
    // Check if the old and the new message is the same
    if (oldMessage.content === newMessage.content) return false

    return await this.log({
      channel: (await channelLogRequest.get()).message,
      embed: MessageUpdateLogEmbedBuilder(oldMessage, newMessage)
    })
  }
}

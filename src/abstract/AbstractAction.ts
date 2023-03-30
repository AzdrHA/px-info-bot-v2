import ButtonCollector from '@collector/ButtonCollector'
import type DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'
import { TextChannel, type ButtonInteraction, type Message } from 'discord.js'
import { MessageCollector } from '@collector/MessageCollector'
import util from 'util'
import translator from '@util/UtilTranslator'
import { MessageButtonCollector } from '@collector/MessageButtonCollector'
import type Client from '@/Client'
import type DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder'
import { type ILogOptions } from '@interface/ILogOptions'

export type Callback = (content: string) => Promise<void>

/**
 * @abstract
 * @class AbstractAction
 */
export default abstract class AbstractAction {
  /**
   * @public
   * @param {Message} message
   * @param {Message | ButtonInteraction} interaction
   * @returns {Promise<Message>}
   */
  public async parentButtonCollector (message: Message, interaction: Message | ButtonInteraction): Promise<ButtonCollector> {
    return new ButtonCollector(message, interaction)
  }

  /**
   * @public
   * @param {Message} clientMessage
   * @param {Message} executorMessage
   * @param {(message: Message) => void} callback
   * @returns {Promise<Message>}
   */
  public async parentMessageCollector (clientMessage: Message, executorMessage: Message | ButtonInteraction, callback?: Callback): Promise<MessageCollector> {
    return new MessageCollector(clientMessage, executorMessage, callback)
  }

  /**
   * @public
   * @param {Message} clientMessage
   * @param executorMessage
   * @param callback
   * @returns {Promise<MessageButtonCollector>}
   * @description Create a message button collector
   */
  public async parentMessageButtonCollector (clientMessage: Message, executorMessage: Message | ButtonInteraction, callback?: Callback): Promise<MessageButtonCollector> {
    return new MessageButtonCollector(clientMessage, executorMessage, callback)
  }

  /**
   * @public
   * @returns {Promise<DefaultButtonRowBuilder[]>}
   * @param {any} DataClass
   */
  public async buildButtons (DataClass: any): Promise<DefaultButtonRowBuilder[]> {
    return new DataClass().buildButton()
  }

  /**
   * @public
   * @param {string} content
   * @param {Channel} channel
   * @param {number} time
   * @returns {Promise<Message>}
   * @description Send a message
   */
  public async tempMessage (content: string, channel: TextChannel, time: number = 5): Promise<Message<true>> {
    return await channel.send({
      content: util.format('%s %s', content, translator('(Automatically removed in {TIME}s)', {
        TIME: time.toString()
      }))
    }).then((message: Message<true>) => {
      setTimeout(() => {
        void message.delete().catch(() => null)
      }, time * 1000)
      return message
    })
  }

  /**
   * @public
   * @param {ILogOptions} options
   * @returns {Promise<Message | false>}
   */
  public async log (options: ILogOptions): Promise<Message | false> {
    const channel = (options.channel != null) ? options.client.channels.cache.get(options.channel) : null
    if (channel != null && channel instanceof TextChannel) {
      return await channel.send({
        embeds: [await options.embed]
      })
    }
    return false
  }
}

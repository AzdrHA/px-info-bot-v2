import type Client from '@/Client'
import { type Message, type MessageCreateOptions, type MessagePayload } from 'discord.js'
import AbstractAction from '@abstract/AbstractAction'

/**
 * @class AbstractCommand
 * @abstract
 */
export default abstract class AbstractCommand extends AbstractAction {
  public client: Client
  public message: Message
  public abstract alias: string[]
  public args: string[] = []

  /**
   * @constructor
   * @param {Client} client
   * @param {Message} message
   * @protected
   */
  public constructor (client: Client, message: Message) {
    super()
    this.client = client
    this.message = message
  }
  public abstract run (): Promise<Message>

  /**
   * @public
   * @returns {Promise<Message>}
   * @description Send a message to the channel
   * @param {string | MessagePayload | MessageCreateOptions} options
   * @returns {Promise<Message>}
   */
  public async send (options: string | MessagePayload | MessageCreateOptions): Promise<Message> {
    return await this.message.channel.send(options)
  }

  /**
   * @public
   * @returns {Promise<void>}
   * @description Delete the message if it is deletable
   */
  public async delete (): Promise<void> {
    if (this.message.deletable) await this.message.delete().catch(() => null)
  }

  /**
   * @public
   * @param {Message} message
   * @param {boolean} autoDeletion
   * @returns {Promise<Message>}
   */
  public async buttonCollector (message: Message, autoDeletion: boolean = false): Promise<Message> {
    return await super.parentButtonCollector(message, this.message, autoDeletion)
  }
}

import type Client from '@/Client'
import { type Message, type MessageCreateOptions, type MessagePayload } from 'discord.js'
import ButtonCollector from '@collector/ButtonCollector'
import type DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'

/**
 * @class AbstractCommand
 * @abstract
 */
export default abstract class AbstractCommand {
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
   * @returns {Promise<Message>}
   */
  public async buttonCollector (message: Message): Promise<Message> {
    // eslint-disable-next-line no-new
    new ButtonCollector(message, this.message)
    return this.message
  }

  /**
   * @public
   * @returns {Promise<DefaultButtonRowBuilder[]>}
   * @param {any} DataClass
   */
  public async buildButtons (DataClass: any): Promise<DefaultButtonRowBuilder[]> {
    return new DataClass().buildButton()
  }
}

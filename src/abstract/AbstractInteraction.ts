import {
  type BooleanCache,
  type ButtonInteraction,
  type CacheType,
  type InteractionEditReplyOptions,
  type Message,
  type MessagePayload,
  type TextChannel
} from 'discord.js'
import type Client from '@/Client'
import AbstractAction, { type Callback } from '@abstract/AbstractAction'
import type ButtonCollector from '@collector/ButtonCollector'
import { type MessageCollector } from '@collector/MessageCollector'
import { type MessageButtonCollector } from '@collector/MessageButtonCollector'

/**
 * @abstract
 * @class AbstractInteraction
 * @description Abstract class for interactions
 * @param {Client} client - The client
 * @param {ButtonInteraction} interaction - The interaction
 * @property {Client} client - The client
 * @property {ButtonInteraction} interaction - The interaction
 * @method run - The run method
 * @method send - The send method
 * @returns {void}
 * @example
 */
export default abstract class AbstractInteraction extends AbstractAction {
  public client: Client
  private _interaction: ButtonInteraction
  public abstract id: string
  public abstract global: boolean
  public abstract run (): Promise<any>

  /**
   * @constructor
   * @param {Client} client
   * @param {ButtonInteraction} interaction
   * @protected
   */
  public constructor (client: Client, interaction: ButtonInteraction) {
    super()
    this.client = client
    this._interaction = interaction
  }

  /**
   * @public
   * @param {string | MessagePayload | InteractionEditReplyOptions} options
   * @returns {Promise<Message<BooleanCache<CacheType>>>}
   * @description Send a message
   * @example
   * await this.send('hello world')
   */
  public async send (options: string | MessagePayload | InteractionEditReplyOptions): Promise<Message<BooleanCache<CacheType>>> {
    return await this._interaction.editReply(options)
  }

  /**
   * @public
   * @returns {Promise<ButtonCollector>}
   */
  get interaction (): ButtonInteraction {
    return this._interaction
  }

  /**
   * @public
   * @param {ButtonInteraction} value
   */
  set interaction (value: ButtonInteraction) {
    this._interaction = value
  }

  /**
   * @public
   * @param {Message} message
   * @param {boolean} autoDeletion
   * @returns {Promise<Message>}
   * @override
   */
  public async buttonCollector (message: Message, autoDeletion: boolean = false): Promise<ButtonCollector> {
    return await super.parentButtonCollector(message, this._interaction)
  }

  /**
   * @public
   * @override
   * @param {Message} message
   * @param {(content: string) => void} callback
   * @returns {Promise<MessageCollector>}
   */
  public async messageCollector (message: Message, callback: Callback): Promise<MessageCollector> {
    return await super.parentMessageCollector(message, this._interaction, callback)
  }

  /**
   * @public
   * @param {Message} message
   * @param {(message: content) => void} callback
   * @returns {Promise<MessageButtonCollector>}
   */
  public async messageButtonCollector (message: Message, callback?: Callback): Promise<MessageButtonCollector> {
    return await super.parentMessageButtonCollector(message, this._interaction, callback)
  }

  /**
   * @public
   * @param {content} content
   * @param {time} time
   * @returns {Promise<any>}
   */
  public async success (content: string, time: number = 5): Promise<Message<true>> {
    return await this.tempMessage(content, this._interaction.channel as TextChannel, time)
  }
}

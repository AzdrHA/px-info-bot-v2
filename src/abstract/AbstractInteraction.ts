import {
  type BooleanCache,
  type ButtonInteraction, type CacheType, type InteractionEditReplyOptions, type Message, type MessagePayload
} from 'discord.js'
import type Client from '@/Client'
import AbstractAction from '@abstract/AbstractAction'

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

  /**
   * @constructor
   * @param {Client} client
   * @param {ButtonInteraction} interaction
   * @protected
   */
  protected constructor (client: Client, interaction: ButtonInteraction) {
    super()
    this.client = client
    this._interaction = interaction
  }

  public abstract id: string
  public abstract global: boolean
  public abstract run (): Promise<any>

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
   * @param {ButtonInteraction} value
   * @returns {ButtonInteraction}
   * @description Get the interaction
   * @param value
   */
  public setInteraction (value: ButtonInteraction): void {
    this._interaction = value
  }

  /**
   * @public
   * @param {Message} message
   * @param {boolean} autoDeletion
   * @returns {Promise<Message>}
   * @override
   */
  public async buttonCollector (message: Message, autoDeletion: boolean = false): Promise<Message> {
    return await super.parentButtonCollector(message, this._interaction, autoDeletion)
  }
}

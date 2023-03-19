import type Client from '../Client'
import {
  type ButtonInteraction
} from 'discord.js'

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
export default abstract class AbstractInteraction {
  public client: Client
  public interaction: ButtonInteraction

  /**
   * @constructor
   * @param {Client} client
   * @param {ButtonInteraction} interaction
   * @protected
   */
  protected constructor (client: Client, interaction: ButtonInteraction) {
    this.client = client
    this.interaction = interaction
  }

  public abstract id: string
  public abstract run (): Promise<void>
}

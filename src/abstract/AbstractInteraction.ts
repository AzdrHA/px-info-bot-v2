import {
  type BooleanCache,
  type ButtonInteraction,
  type CacheType,
  type InteractionEditReplyOptions,
  type Message,
  type MessagePayload
} from 'discord.js';
import type Client from '@/Client';
import AbstractAction from '@abstract/AbstractAction';

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
  public abstract id: string;
  public abstract global: boolean;
  public abstract run(): Promise<any>;
  public interaction: ButtonInteraction;

  /**
   * @constructor
   * @param {Client} client
   * @param {ButtonInteraction} interaction
   * @protected
   */
  public constructor(client: Client, interaction: ButtonInteraction) {
    super(client, interaction);
    this.interaction = interaction;
  }

  /**
   * @public
   * @param {string | MessagePayload | InteractionEditReplyOptions} options
   * @returns {Promise<Message<BooleanCache<CacheType>>>}
   * @description Send a message
   * @example
   * await this.send('hello world')
   */
  public async send(
    options: string | MessagePayload | InteractionEditReplyOptions
  ): Promise<Message<BooleanCache<CacheType>>> {
    return await this.interaction.editReply(options);
  }
}

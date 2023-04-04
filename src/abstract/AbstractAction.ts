import ButtonCollector from '@collector/ButtonCollector';
import type DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder';
import { TextChannel, type ButtonInteraction, type Message } from 'discord.js';
import { MessageCollector } from '@collector/MessageCollector';
import util from 'util';
import translator from '@util/UtilTranslator';
import { MessageButtonCollector } from '@collector/MessageButtonCollector';
import { type ILogOptions } from '@interface/ILogOptions';
import type Client from '@/Client';

export type Callback = (content: string) => Promise<void>;

/**
 * @abstract
 * @class AbstractAction
 */
export default abstract class AbstractAction {
  public client: Client;

  private readonly _interaction: Message | ButtonInteraction;

  /**
   * @constructor
   * @param {Client} client
   * @param {ButtonInteraction | Message} interaction
   * @protected
   */
  public constructor(client: Client, interaction: ButtonInteraction | Message) {
    this.client = client;
    this._interaction = interaction;
  }

  /**
   * @public
   * @param {Message} message
   * @param {Callback} callback
   * @returns {Promise<Message>}
   */
  public async buttonCollector(message: Message, callback: Callback | undefined = undefined): Promise<ButtonCollector> {
    return new ButtonCollector(message, this._interaction, callback);
  }

  /**
   * @public
   * @param {Message} clientMessage
   * @param {(message: Message) => void} callback
   * @returns {Promise<Message>}
   */
  public async messageCollector(
    clientMessage: Message,
    callback?: Callback
  ): Promise<MessageCollector> {
    return new MessageCollector(clientMessage, this._interaction, callback);
  }

  /**
   * @public
   * @param {Message} clientMessage
   * @param callback
   * @returns {Promise<MessageButtonCollector>}
   * @description Create a message button collector
   */
  public async messageButtonCollector(
    clientMessage: Message,
    callback?: Callback
  ): Promise<MessageButtonCollector> {
    return new MessageButtonCollector(
      clientMessage,
      this._interaction,
      callback
    );
  }

  /**
   * @public
   * @returns {Promise<DefaultButtonRowBuilder[]>}
   * @param {any} DataClass
   */
  public async buildButtons(
    DataClass: any
  ): Promise<DefaultButtonRowBuilder[]> {
    return new DataClass().buildButton();
  }

  /**
   * @public
   * @param {content} content
   * @param {time} time
   * @returns {Promise<any>}
   */
  public async success(
    content: string,
    time: number = 5
  ): Promise<Message<true>> {
    return await this.tempMessage(
      content,
      this._interaction.channel as TextChannel,
      time
    );
  }

  /**
   * @public
   * @param {string} content
   * @param {Channel} channel
   * @param {number} time
   * @returns {Promise<Message>}
   * @description Send a message
   */
  public async tempMessage(
    content: string,
    channel: TextChannel,
    time: number = 5
  ): Promise<Message<true>> {
    return await channel
      .send({
        content: util.format(
          '%s %s',
          content,
          translator('(Automatically removed in {TIME}s)', {
            TIME: time.toString()
          })
        )
      })
      .then((message: Message<true>) => {
        setTimeout(() => {
          void message.delete().catch(() => null);
        }, time * 1000);
        return message;
      });
  }

  /**
   * @public
   * @param {ILogOptions} options
   * @returns {Promise<Message | false>}
   */
  public async log(options: ILogOptions): Promise<Message | false> {
    const channel =
      options.channel != null
        ? this.client.channels.cache.get(options.channel)
        : null;
    if (channel != null && channel instanceof TextChannel) {
      return await channel.send({
        embeds: [await options.embed]
      });
    }
    return false;
  }
}

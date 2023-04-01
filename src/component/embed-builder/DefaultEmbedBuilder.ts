import {
  type APIEmbed,
  Colors,
  EmbedBuilder,
  type EmbedData
} from 'discord.js';

/**
 * @class DefaultEmbedBuilder
 * @description The default embed builder
 * @extends EmbedBuilder
 */
export default class DefaultEmbedBuilder extends EmbedBuilder {
  /**
   * @constructor
   * @param data
   */
  public constructor(data?: EmbedData | APIEmbed) {
    if (data == null) data = {};
    if (data.color == null) {
      const colorKeys = Object.values(Colors);
      data.color = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    }
    if (data.timestamp == null) data.timestamp = new Date();
    super(data);
  }
}

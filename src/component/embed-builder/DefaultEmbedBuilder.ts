import { type APIEmbed, EmbedBuilder, type EmbedData } from 'discord.js'

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
  public constructor (data?: EmbedData | APIEmbed) {
    super(data)
    this.setColor('Random')
    this.setTimestamp()
  }
}

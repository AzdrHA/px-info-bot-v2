import { Message, type ButtonInteraction, type InteractionCollector, ComponentType } from 'discord.js'
import UtilLogger from '@util/UtilLogger'

/**
 * @class ButtonCollector
 * @description Collects button interactions
 */
export default class ButtonCollector {
  private readonly message: Message
  private readonly interaction: Message | ButtonInteraction
  private collector: InteractionCollector<ButtonInteraction> | undefined
  private readonly callback: ((customId: string) => void) | undefined

  /**
   * @constructor
   * @param {Message} message
   * @param {Message | ButtonInteraction} interaction
   */
  public constructor (message: Message, interaction: Message | ButtonInteraction) {
    this.message = message
    this.interaction = interaction
    this.__init()
  }

  /**
   * @private
   * @returns {void}
   * @description Initialize the collector
   */
  private __init (): void {
    if (this.message.components.length === 0) {
      UtilLogger.warn('No buttons found in the message')
      return
    }
    const author = this.interaction instanceof Message ? this.interaction.author : this.interaction.user

    this.collector = this.message.createMessageComponentCollector({
      filter: (interaction: ButtonInteraction) => interaction.user.id === author.id,
      componentType: ComponentType.Button,
      time: 60000,
      max: 1
    })

    this.collector.on('collect', this.__collect)
  }

  private readonly __collect = async (i: ButtonInteraction): Promise<void> => {
    await i.message.delete().catch(() => null)
    if (this.callback != null) this.callback(i.customId)
  }
}

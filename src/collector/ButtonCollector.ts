import { Message, type ButtonInteraction, type InteractionCollector, ComponentType } from 'discord.js'
import UtilLogger from '@util/UtilLogger'
import InteractionService from '@service/InteractionService'

/**
 * @class ButtonCollector
 * @description Collects button interactions
 */
export default class ButtonCollector {
  private readonly message: Message
  private readonly interaction: Message | ButtonInteraction
  private collector: InteractionCollector<ButtonInteraction> | undefined
  private readonly callback: ((customId: string) => void) | undefined
  private readonly autoDeletion: boolean = false

  /**
   * @constructor
   * @param {Message} message
   * @param {Message | ButtonInteraction} interaction
   * @param {boolean} autoDeletion
   */
  public constructor (message: Message, interaction: Message | ButtonInteraction, autoDeletion: boolean = false) {
    this.message = message
    this.interaction = interaction
    this.autoDeletion = autoDeletion
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

  private readonly __collect = async (interaction: ButtonInteraction): Promise<any> => {
    if (this.autoDeletion) return await interaction.message.delete().catch(() => null)
    await interaction.update({ content: 'Loading...', components: [] })
    await new InteractionService().run(interaction)
    if (this.callback != null) this.callback(interaction.customId)
  }

  /**
   * @return {InteractionCollector<ButtonInteraction>}
   */
  public getCollector = (): InteractionCollector<ButtonInteraction> | undefined => {
    return this.collector
  }
}

import { type ButtonInteraction } from 'discord.js'
import { INTERACTION_LIST } from '@config/Constant'
import type AbstractInteraction from '@abstract/AbstractInteraction'

/**
 * @class InteractionService
 */
export default class InteractionService {
  /**
   * @public
   * @param {ButtonInteraction} interaction
   * @param {boolean} global
   * @returns {Promise<any>}
   * @description Run the interaction
   * @example
   * const interactionService = new InteractionService()
   * interactionService.run(interaction)
   * @example
   * const interactionService = new InteractionService()
   * interactionService.run(interaction, true)
   */
  public async run (interaction: ButtonInteraction, global = false): Promise<any> {
    // Get the interaction
    const Action = INTERACTION_LIST.get(interaction.customId)

    // Ignore if interaction is not found
    if (Action == null) return false

    const _interaction: AbstractInteraction = new Action(interaction.client, interaction)

    // Ignore if interaction is not global
    if (_interaction.global !== global) return false

    // add attribute interaction to interaction
    _interaction.interaction = interaction

    // Run the interaction
    return await _interaction.run()
  }
}

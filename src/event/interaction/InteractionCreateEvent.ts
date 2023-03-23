import { type BaseInteraction } from 'discord.js'
import { DEVELOPERS, SUPPORT_DISCORD } from '@config/AppConfig'
import { ENodeEnv } from '@enum/ENodeEnv'
import AppException from '@exception/AppException'
import AbstractEvent from '@abstract/AbstractEvent'
import InteractionService from '@service/InteractionService'

/**
 * @class InteractionCreateEvent
 * @extends AbstractEvent
 * @classdesc Event class for interactionCreate event.
 * @see https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-interactionCreate
 */
export default class InteractionCreateEvent extends AbstractEvent {
  /**
   * @constructor
   * @param {BaseInteraction} interaction
   * @returns {Promise<any>}
   */
  public async run (interaction: BaseInteraction): Promise<any> {
    // Ignore interaction from other guild
    if (interaction.guildId !== SUPPORT_DISCORD) return '11'

    // Ignore message form people who are not developer in dev mode
    if (process.env.NODE_ENV === ENodeEnv.DEVELOPMENT && !DEVELOPERS.includes(interaction.user.id)) return '22'

    // Ignore interaction that is not command
    if (!interaction.isButton()) return '333'

    try {
      return await new InteractionService().run(interaction, true)
    } catch (error) {
      if (error instanceof AppException) {
        return (interaction.channel != null) && await interaction.channel.send(error.message)
      }
      console.error(error)
      return (interaction.channel != null) && await interaction.channel.send({
        content: 'There was an error trying to execute that command!'
      })
    }
  }
}

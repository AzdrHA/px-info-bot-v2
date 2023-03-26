import { type BaseInteraction, type TextChannel } from 'discord.js'
import { DEVELOPERS, SUPPORT_DISCORD } from '@config/AppConfig'
import { ENodeEnv } from '@enum/ENodeEnv'
import AbstractEvent from '@abstract/AbstractEvent'
import InteractionService from '@service/InteractionService'
import ExceptionService from '@service/ExceptionService'

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
    if (interaction.guildId !== SUPPORT_DISCORD) return false

    // Ignore message form people who are not developer in dev mode
    if (process.env.NODE_ENV === ENodeEnv.DEVELOPMENT && !DEVELOPERS.includes(interaction.user.id)) return false

    // Ignore interaction that is not command
    if (!interaction.isButton()) return false

    try {
      return await new InteractionService().run(interaction, true)
    } catch (error) {
      return new ExceptionService(error as Error, interaction.channel as TextChannel)
    }
  }
}

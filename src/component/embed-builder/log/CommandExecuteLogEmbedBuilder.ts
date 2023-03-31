import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder'
import { bold, Colors, type User } from 'discord.js'
import util from 'util'
import translator from '@util/UtilTranslator'

/**
 * @param {string} commandName
 * @param {User} executor
 * @constructor
 */
export const CommandExecuteLogEmbedBuilder = async (commandName: string, executor: User): Promise<DefaultEmbedBuilder> => {
  return new DefaultEmbedBuilder().setColor(Colors.Green).setAuthor({
    name: util.format(
      '%s#%s',
      executor.username,
      executor.discriminator
    ),
    iconURL: executor.displayAvatarURL() ?? undefined
  })
    .setDescription(
      translator('{USER} has executed the {COMMAND} command', {
        COMMAND: bold(commandName),
        USER: executor.toString()
      })
    )
}

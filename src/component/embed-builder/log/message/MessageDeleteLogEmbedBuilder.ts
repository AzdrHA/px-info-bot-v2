import { bold, channelMention, Colors, type Message } from 'discord.js'
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder'
import util from 'util'
import translator from '@util/UtilTranslator'

/**
 * @param {Message} message
 * @constructor
 */
export const MessageDeleteLogEmbedBuilder = async (message: Message): Promise<DefaultEmbedBuilder> => {
  return new DefaultEmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({
      name: util.format(
        '%s#%s',
        message.author.username,
        message.author.discriminator
      ),
      iconURL: message.author.displayAvatarURL() ?? undefined
    })
    .setDescription(
      translator(
        'Message sent by {USER} deleted in {CHANNEL}\nContent: {CONTENT}',
        {
          USER:
            message.author?.toString() ??
            bold(translator('Not user provided')),
          CHANNEL: channelMention(message.channel.id),
          CONTENT: bold(
            message.content ?? translator('No content provided')
          )
        }
      )
    )
    .setTimestamp(new Date())
    .setFooter({
      text: translator(
        'User ID: {USER} | Message ID: {MESSAGE}',
        {
          USER: message.author.id,
          MESSAGE: message.id
        }
      )
    })
}

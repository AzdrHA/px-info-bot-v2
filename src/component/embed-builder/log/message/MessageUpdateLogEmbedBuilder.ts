import { channelMention, Colors, type Message, userMention } from 'discord.js'
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder'
import util from 'util'
import translator from '@util/UtilTranslator'
import { getNested } from '@util/UtilStr'

/**
 * @param {Message} oldMessage
 * @param {Message} newMessage
 * @constructor
 */
export const MessageUpdateLogEmbedBuilder = async (oldMessage: Message, newMessage: Message): Promise<DefaultEmbedBuilder> => {
  return new DefaultEmbedBuilder()
    .setColor(Colors.Blue)
    .setAuthor({
      name: util.format(
        '%s#%s',
        newMessage.author.username,
        newMessage.author.discriminator
      ),
      iconURL: newMessage.author.avatarURL() ?? undefined
    })
    .setDescription(
      newMessage.content !== ''
        ? translator(
          'Message sent by {USER} edited in {CHANNEL} [Jump to Message]({LINK})',
          {
            USER: userMention(newMessage.author.id),
            CHANNEL: channelMention(newMessage.channelId),
            LINK: newMessage.url
          }
        )
        : translator('No content provided')
    )
    .setFields(
      {
        name: translator('Before'),
        value: getNested('oldMessage.content', oldMessage, translator('No content provided'))
      },
      {
        name: translator('After'),
        value: getNested('newMessage.content', newMessage, translator('No content provided'))
      }
    )
    .setFooter({
      text: translator(
        'User ID: {USER} | Message ID: {MESSAGE}',
        {
          USER: newMessage.author.id,
          MESSAGE: newMessage.id
        }
      )
    })
}

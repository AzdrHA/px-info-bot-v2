import { describe, expect, it, vi } from 'vitest';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import translator from '@util/UtilTranslator';
import util from 'util';
import { channelMention, Colors, userMention } from 'discord.js';
import { getNested } from '@util/UtilStr';
import { MessageUpdateLogEmbedBuilder } from '@component/embed-builder/log/message/MessageUpdateLogEmbedBuilder';

describe('MessageDeleteLogEmbedBuilder.test', () => {
  it('should return an embed', async () => {
    const message = {
      id: '1234567890',
      content: 'test',
      channel: {
        id: '1234567890'
      },
      author: {
        id: '1234567890',
        username: 'test',
        discriminator: '0000',
        displayAvatarURL: vi.fn(),
        toString: vi.fn()
      }
    } as any;
    const embed = await MessageUpdateLogEmbedBuilder(message, message);

    expect(embed).toStrictEqual(
      new DefaultEmbedBuilder({
        color: embed.data.color,
        timestamp: embed.data.timestamp
      })
        .setColor(Colors.Blue)
        .setAuthor({
          name: util.format(
            '%s#%s',
            message.author.username,
            message.author.discriminator
          ),
          iconURL: message.author.displayAvatarURL() ?? undefined
        })
        .setDescription(
          message.content !== ''
            ? translator(
                'Message sent by {USER} edited in {CHANNEL} [Jump to Message]({LINK})',
                {
                  USER: userMention(message.author.id),
                  CHANNEL: channelMention(message.channelId),
                  LINK: message.url
                }
              )
            : translator('No content provided')
        )
        .setFields(
          {
            name: translator('Before'),
            value: getNested(
              'oldMessage.content',
              message,
              translator('No content provided')
            )
          },
          {
            name: translator('After'),
            value: getNested(
              'newMessage.content',
              message,
              translator('No content provided')
            )
          }
        )
        .setFooter({
          text: translator('User ID: {USER} | Message ID: {MESSAGE}', {
            USER: message.author.id,
            MESSAGE: message.id
          })
        })
    );
  });
});

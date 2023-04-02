import { describe, expect, it, vi } from 'vitest';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import translator from '@util/UtilTranslator';
import util from 'util';
import { bold, channelMention } from 'discord.js';
import { MessageDeleteLogEmbedBuilder } from '@component/embed-builder/log/message/MessageDeleteLogEmbedBuilder';

describe('MessageUpdateLogEmbedBuilder.test', () => {
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
    const embed = await MessageDeleteLogEmbedBuilder(message);

    expect(embed).toStrictEqual(
      new DefaultEmbedBuilder({
        color: embed.data.color,
        timestamp: embed.data.timestamp
      })
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
        .setFooter({
          text: translator('User ID: {USER} | Message ID: {MESSAGE}', {
            USER: message.author.id,
            MESSAGE: message.id
          })
        })
    );
  });
});

import { describe, expect, it, vi } from 'vitest';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import translator from '@util/UtilTranslator';
import { UpdateMemberRoleGuildMemberEmbedBuilder } from '@component/embed-builder/log/guild-member/UpdateMemberRoleGuildMemberEmbedBuilder';
import { roleMention, userMention } from 'discord.js';
import util from 'util';
import { UpdateNameGuildMemberEmbedBuilder } from '@component/embed-builder/log/guild-member/UpdateNameGuildMemberEmbedBuilder';

describe('UpdateMemberRoleGuildMemberEmbedBuilder.test', () => {
  it('should return an embed', async () => {
    const member = {
      id: '123456789',
      displayAvatarURL: vi.fn(),
      user: {
        username: 'test'
      }
    } as any;
    const embed = await UpdateNameGuildMemberEmbedBuilder(member, member);

    expect(embed).toStrictEqual(
      new DefaultEmbedBuilder({
        color: embed.data.color,
        timestamp: embed.data.timestamp
      })
        .setAuthor({
          name: util.format(
            '%s#%s',
            member.user.username,
            member.user.discriminator
          ),
          iconURL: member.displayAvatarURL() ?? undefined
        })
        .setDescription(
          translator('{MEMBER} nickname changed', {
            MEMBER: userMention(member.id)
          })
        )
        .setFields(
          {
            name: translator('Before'),
            value: member.displayName,
            inline: false
          },
          {
            name: translator('After'),
            value: member.displayName,
            inline: false
          }
        )
        .setFooter({
          text: translator('User ID: {USER_ID}', {
            USER_ID: member.id
          })
        })
    );
  });
});

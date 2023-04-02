import { describe, expect, it, vi } from 'vitest';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import translator from '@util/UtilTranslator';
import util from 'util';
import { AddGuildMemberEmbedBuilder } from '@component/embed-builder/log/guild-member/AddGuildMemberEmbedBuilder';
import { RemoveGuildMemberEmbedBuilder } from '@component/embed-builder/log/guild-member/RemoveGuildMemberEmbedBuilder';

describe('RemoveGuildMemberEmbedBuilder.test', () => {
  it('should return an embed', async () => {
    const member = {
      displayAvatarURL: vi.fn(),
      user: {
        username: 'test'
      }
    } as any;
    const embed = await RemoveGuildMemberEmbedBuilder(member);

    expect(embed).toStrictEqual(
      new DefaultEmbedBuilder({
        color: embed.data.color,
        timestamp: embed.data.timestamp
      })
        .setAuthor({
          name: translator('Member Left'),
          iconURL: member.displayAvatarURL() ?? undefined
        })
        .setDescription(
          util.format('%s %s', member.toString(), member.user.username)
        )
        .setThumbnail(member.displayAvatarURL())
        .setFooter({
          text: translator('User ID: {USER_ID}', {
            USER_ID: member.id
          })
        })
    );
  });
});

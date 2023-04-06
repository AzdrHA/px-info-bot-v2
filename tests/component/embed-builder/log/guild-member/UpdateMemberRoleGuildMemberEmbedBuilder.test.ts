import { describe, expect, it } from 'vitest';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import translator from '@util/UtilTranslator';
import { UpdateMemberRoleGuildMemberEmbedBuilder } from '@component/embed-builder/log/guild-member/UpdateMemberRoleGuildMemberEmbedBuilder';
import { roleMention, userMention } from 'discord.js';

describe('UpdateMemberRoleGuildMemberEmbedBuilder.test', () => {
  it('should return an embed', async () => {
    const member = {
      id: '123456789'
    } as any;
    const memberRole = '123456789';
    const embed = await UpdateMemberRoleGuildMemberEmbedBuilder(
      member,
      member,
      memberRole
    );

    expect(embed).toStrictEqual(
      new DefaultEmbedBuilder({
        color: embed.data.color,
        timestamp: embed.data.timestamp
      }).setDescription(
        translator('Role {ROLE} was juste added to {MEMBER}', {
          MEMBER: userMention(member.id),
          ROLE: roleMention(memberRole)
        })
      )
    );
  });
});

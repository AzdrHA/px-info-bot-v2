import { ButtonBuilder, ButtonStyle } from 'discord.js';
import translator from '@util/UtilTranslator';
import { describe, it, expect } from 'vitest';
import { ERoleSetCommand } from '@enum/command/ERoleSetCommand';
import RoleSetCommandButton from '@component/button/command/set-command/RoleSetCommandButton';

describe('RoleSetCommandButton', () => {
  it('should return an array of button', async () => {
    expect(await new RoleSetCommandButton().initializeButton()).toEqual([
      new ButtonBuilder({
        label: translator('Member'),
        style: ButtonStyle.Primary,
        customId: ERoleSetCommand.MEMBER
      }),
      new ButtonBuilder({
        label: translator('Support'),
        style: ButtonStyle.Primary,
        customId: ERoleSetCommand.SUPPORT
      }),
      new ButtonBuilder({
        label: translator('Administrator'),
        style: ButtonStyle.Primary,
        customId: ERoleSetCommand.ADMIN
      })
    ]);
  });
});

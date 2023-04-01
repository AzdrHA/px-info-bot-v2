import { ButtonBuilder, ButtonStyle } from 'discord.js';
import translator from '@util/UtilTranslator';
import { describe, it, expect } from 'vitest';
import ChannelSetCommandButton from '@component/button/command/set-command/ChannelSetCommandButton';
import { EChannelSetCommand } from '@enum/command/EChannelSetCommand';

describe('ChannelSetCommandButton', () => {
  it('should return an array of button', async () => {
    expect(await new ChannelSetCommandButton().initializeButton()).toEqual([
      new ButtonBuilder({
        label: translator('Info'),
        style: ButtonStyle.Primary,
        customId: EChannelSetCommand.INFO
      }),
      new ButtonBuilder({
        label: translator('Menu News'),
        style: ButtonStyle.Primary,
        customId: EChannelSetCommand.MENU_NEWS
      }),
      new ButtonBuilder({
        label: translator('Menu Info'),
        style: ButtonStyle.Primary,
        customId: EChannelSetCommand.MENU_INFO
      }),
      new ButtonBuilder({
        label: translator('Shop News'),
        style: ButtonStyle.Primary,
        customId: EChannelSetCommand.SHOP_NEWS
      }),
      new ButtonBuilder({
        label: translator('Shop Announcement'),
        style: ButtonStyle.Primary,
        customId: EChannelSetCommand.SHOP_ANNOUNCEMENT
      })
    ]);
  });
});

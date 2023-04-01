import { ButtonBuilder, ButtonStyle } from 'discord.js';
import translator from '@util/UtilTranslator';
import { describe, it, expect } from 'vitest';
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand';
import ticketSettingRequest from '@/api/TicketSettingRequest';
import TicketSetCommandButton from '@component/button/command/set-command/ticket/TicketSetCommandButton';

describe('TicketSetCommandButton', () => {
  it('should return an array of button', async () => {
    const ticketSetting = await ticketSettingRequest.get();

    expect(await new TicketSetCommandButton().initializeButton()).toEqual([
      new ButtonBuilder({
        label: translator('Archived Category'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.ARCHIVED_CATEGORY
      }),
      new ButtonBuilder({
        label: translator('Category'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.CATEGORY
      }),
      new ButtonBuilder({
        label: translator('Channel'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.CHANNEL,
        disabled: ticketSetting.category == null
      }),
      new ButtonBuilder({
        label: translator('Content Button'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.CONTENT_BUTTON,
        disabled: ticketSetting.category == null
      }),
      new ButtonBuilder({
        label: translator('Content Message'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.CONTENT_MESSAGE,
        disabled: ticketSetting.category == null
      })
    ]);
  });
});

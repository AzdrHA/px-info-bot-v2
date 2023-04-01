import { describe, it, expect } from 'vitest';
import { EGlobalButton } from '@enum/EGlobalButton';
import translator from '@util/UtilTranslator';
import { MENU_FAQ_LINK, TROUBLESHOOT_LINK } from '@config/Constant';
import TicketButton from '@component/button/TicketButton';
import { ButtonBuilder, ButtonStyle } from 'discord.js';
import ticketSettingRequest from '@/api/TicketSettingRequest';

describe('TicketButton', () => {
  it('should return an array of button', async () => {
    const ticketSetting = await ticketSettingRequest.get();

    expect(await new TicketButton().initializeButton()).toStrictEqual([
      new ButtonBuilder({
        label: ticketSetting.contentButton,
        style: ButtonStyle.Success,
        customId: EGlobalButton.CREATE_TICKET,
        disabled: ticketSetting.category == null
      }),
      new ButtonBuilder({
        label: translator('Menu FAQ'),
        style: ButtonStyle.Link,
        url: MENU_FAQ_LINK
      }),
      new ButtonBuilder({
        label: translator('Troubleshoot'),
        style: ButtonStyle.Link,
        url: TROUBLESHOOT_LINK
      })
    ]);
  });
});

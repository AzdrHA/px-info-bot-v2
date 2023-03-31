import { ButtonBuilder, ButtonStyle } from 'discord.js';
import translator from '@util/UtilTranslator';
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder';
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand';
import ticketSettingRequest from '@/api/TicketSettingRequest';

/**
 * @class TicketSetCommandButton
 * @extends DefaultButtonBuilder
 */
export default class TicketSetCommandButton extends DefaultCanceledButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    const ticketSetting = await ticketSettingRequest.get();

    return [
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
    ];
  };
}

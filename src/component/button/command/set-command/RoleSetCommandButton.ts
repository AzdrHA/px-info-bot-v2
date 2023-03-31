import { ButtonBuilder, ButtonStyle } from 'discord.js';
import translator from '@util/UtilTranslator';
import { ERoleSetCommand } from '@enum/command/ERoleSetCommand';
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder';

/**
 * @class RoleSetCommandButton
 * @extends DefaultButtonBuilder
 */
export default class RoleSetCommandButton extends DefaultCanceledButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
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
    ];
  };
}

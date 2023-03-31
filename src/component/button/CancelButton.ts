import translator from '@util/UtilTranslator';
import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { EGlobalButton } from '@enum/EGlobalButton';

/**
 * @class CancelButton
 * @extends ButtonBuilder
 */
export default class CancelButton extends ButtonBuilder {
  /**
   * @constructor
   * @returns {void}
   */
  public constructor() {
    super({
      label: translator('Cancel'),
      style: ButtonStyle.Danger,
      customId: EGlobalButton.CANCEL
    });
  }
}

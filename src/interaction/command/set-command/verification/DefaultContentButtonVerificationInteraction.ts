import AbstractInteraction from '@abstract/AbstractInteraction';
import translator from '@util/UtilTranslator';
import UtilLogger from '@util/UtilLogger';
import VerificationSettingService from '@service/VerificationSettingService';
import { EVerificationSetCommand } from '@enum/command/EVerificationSetCommand';

/**
 * @class DefaultContentButtonVerificationInteraction
 * @extends AbstractInteraction
 */
export default class DefaultContentButtonVerificationInteraction extends AbstractInteraction {
  public global: boolean = false;
  public id: string = EVerificationSetCommand.DEFAULT_BUTTON;

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    this.interaction.message.delete().catch(() => {});
    const verificationSettingService = new VerificationSettingService();
    await verificationSettingService.updateContentButton(
      this.client,
      VerificationSettingService.DEFAULT_BUTTON_CONTENT
    );
    await this.success(
      translator('The **{TYPE}** has been successfully updated', {
        TYPE: translator('Content Button')
      })
    );
    UtilLogger.success(
      'DefaultContentButtonVerificationInteraction callback ' +
        VerificationSettingService.DEFAULT_BUTTON_CONTENT
    );
  }
}

import AbstractInteraction from '@abstract/AbstractInteraction';
import translator from '@util/UtilTranslator';
import UtilLogger from '@util/UtilLogger';
import VerificationSettingService from '@service/VerificationSettingService';
import { EVerificationSetCommand } from '@enum/command/EVerificationSetCommand';

/**
 * @class DefaultMessageContentVerificationInteraction
 * @extends AbstractInteraction
 */
export default class DefaultMessageContentVerificationInteraction extends AbstractInteraction {
  public global: boolean = false;
  public id: string = EVerificationSetCommand.DEFAULT_MESSAGE;

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    this.interaction.message.delete().catch(() => {});
    const verificationSettingService = new VerificationSettingService();
    await verificationSettingService.updateMessageContent(
      this.client,
      VerificationSettingService.DEFAULT_MESSAGE_CONTENT
    );
    await this.success(
      translator('The **{TYPE}** has been successfully updated', {
        TYPE: translator('Message Content')
      })
    );
    UtilLogger.success(
      'DefaultContentButtonVerificationInteraction callback ' +
        VerificationSettingService.DEFAULT_MESSAGE_CONTENT
    );
  }
}

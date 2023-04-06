import translator from '@util/UtilTranslator';
import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import StatusSChangeCommandButton from "@component/button/command/schange-command/StatusSChangeCommandButton";
import {EStatusSChangeButton} from "@enum/command/schange-command/EStatusSChangeButton";
import AppException from "@exception/AppException";
import MenuInfoService from "@service/MenuInfoService";
import AbstractSChangeInteraction from "@abstract/AbstractSChangeInteraction";
import {revertInteractionIdToTranslation} from "@util/UtilStr";

/**
 * @class StatusSChangeInteraction
 * @extends AbstractInteraction
 */
export default class StatusSChangeInteraction extends AbstractSChangeInteraction {
  public id: string = ESChangeButton.STATUS;
  public buttons = StatusSChangeCommandButton;
  public key: string = 'Status';

  private readonly ACCEPT_ENTRY: string[] = [
    EStatusSChangeButton.ONLINE,
    EStatusSChangeButton.OFFLINE,
    EStatusSChangeButton.MAINTENANCE,
    EStatusSChangeButton.TESTING
  ];

  public callback = async (content: string): Promise<void> => {
    if (!this.ACCEPT_ENTRY.includes(content)) throw new AppException('Invalid entry. Please try again.')
    await new MenuInfoService().updateStatus(this.client, revertInteractionIdToTranslation(content))
    await this.success(
      translator('The new **{TYPE}** has just been modified!', {
        TYPE: translator(this.key)
      })
    );
  }
}

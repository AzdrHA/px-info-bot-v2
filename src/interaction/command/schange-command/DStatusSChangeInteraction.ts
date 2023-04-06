import AbstractSChangeInteraction from "@abstract/AbstractSChangeInteraction";
import StatusSChangeCommandButton from "@component/button/command/schange-command/StatusSChangeCommandButton";
import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import AppException from "@exception/AppException";
import MenuInfoService from "@service/MenuInfoService";
import translator from "@util/UtilTranslator";
import {EStatusSChangeButton} from "@enum/command/schange-command/EDStatusSChangeButton";
import {revertInteractionIdToTranslation} from "@util/UtilStr";

/**
 * @class DStatusSChangeInteraction
 * @extends AbstractInteraction
 */
export default class DStatusSChangeInteraction extends AbstractSChangeInteraction {
  public id: string = ESChangeButton.D_STATUS;
  public buttons = StatusSChangeCommandButton;
  public key: string = 'Status';

  private readonly ACCEPT_ENTRY: string[] = [
    EStatusSChangeButton.UNDETECTED,
    EStatusSChangeButton.DETECTED,
    EStatusSChangeButton.RISKY
  ];


  public callback = async (content: string): Promise<void> => {
    if (!this.ACCEPT_ENTRY.includes(content)) throw new AppException('Invalid entry. Please try again.')
    await new MenuInfoService().updateDStatus(this.client, revertInteractionIdToTranslation(content))
    await this.success(
      translator('The new **{TYPE}** has just been modified!', {
        TYPE: translator(this.key)
      })
    );
  }
}

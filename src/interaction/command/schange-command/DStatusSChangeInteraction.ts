import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import AppException from "@exception/AppException";
import MenuInfoService from "@service/MenuInfoService";
import translator from "@util/UtilTranslator";
import {revertInteractionIdToTranslation} from "@util/UtilStr";
import AbstractInteraction from "@abstract/AbstractInteraction";
import {EDStatusSChangeButton} from "@enum/command/schange-command/EDStatusSChangeButton";
import DStatusSChangeCommandButton from "@component/button/command/schange-command/DStatusSChangeCommandButton";

/**
 * @class DStatusSChangeInteraction
 * @extends AbstractInteraction
 */
export default class DStatusSChangeInteraction extends AbstractInteraction {
  public id: string = ESChangeButton.D_STATUS;
  public global: boolean = false;

  private readonly ACCEPT_ENTRY: string[] = [
    EDStatusSChangeButton.UNDETECTED,
    EDStatusSChangeButton.DETECTED,
    EDStatusSChangeButton.RISKY
  ];

  public callback = async (content: string): Promise<void> => {
    if (!this.ACCEPT_ENTRY.includes(content)) throw new AppException('Invalid entry. Please try again.')
    await new MenuInfoService().updateDStatus(this.client, revertInteractionIdToTranslation(content))
    await this.success(
      translator('The new **{TYPE}** has just been modified!', {
        TYPE: translator('DStatus')
      })
    );
  }

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    return await this.buttonCollector(
      await this.send({
        content: translator(
          'What **{TYPE}** settings would you like to change?',
          {
            TYPE: translator('DStatus')
          }
        ),
        components: await this.buildButtons(DStatusSChangeCommandButton)
      }), this.callback.bind(this)
    );
  }
}

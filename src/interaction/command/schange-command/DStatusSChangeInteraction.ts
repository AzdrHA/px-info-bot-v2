import AbstractInteraction from '@abstract/AbstractInteraction';
import translator from '@util/UtilTranslator';
import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import StatusSChangeCommandButton from "@component/button/command/schange-command/StatusSChangeCommandButton";
import {EStatusSChangeButton} from "@enum/command/schange-command/EStatusSChangeButton";
import AppException from "@exception/AppException";
import MenuInfoService from "@service/MenuInfoService";
import {revertInteractionIdToTranslation} from "@util/UtilStr";

/**
 * @class DStatusSChangeInteraction
 * @extends AbstractInteraction
 */
export default class DStatusSChangeInteraction extends AbstractInteraction {
  public global: boolean = false;
  public id: string = ESChangeButton.D_STATUS;

  private readonly ACCEPT_ENTRY: string[] = [
    EStatusSChangeButton.ONLINE,
    EStatusSChangeButton.OFFLINE,
    EStatusSChangeButton.MAINTENANCE,
    EStatusSChangeButton.TESTING
  ];

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    /**
     * @param {string} content
     * @return {Promise<void>}
     */
    const callback = async (content: string): Promise<void> => {
      if (!this.ACCEPT_ENTRY.includes(content)) throw new AppException('Invalid entry. Please try again.')
      await new MenuInfoService().updateStatus(this.client, revertInteractionIdToTranslation(content)).then(async () => {
        await this.success(
          translator('The new **{TYPE}** has just been modified!', {
            TYPE: translator('Status')
          })
        );
      });
    }

    return await this.buttonCollector(
      await this.send({
        content: translator(
          'What **{TYPE}** settings would you like to change?',
          {
            TYPE: translator('Status')
          }
        ),
        components: await this.buildButtons(StatusSChangeCommandButton)
      }), callback
    );
  }
}

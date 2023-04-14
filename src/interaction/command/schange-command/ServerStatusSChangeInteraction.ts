import translator from '@util/UtilTranslator';
import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import AppException from "@exception/AppException";
import MenuInfoService from "@service/MenuInfoService";
import {revertInteractionIdToTranslation} from "@util/UtilStr";
import AbstractInteraction from "@abstract/AbstractInteraction";
import ServerStatusSChangeCommandButton
  from "@component/button/command/schange-command/ServerStatusSChangeCommandButton";
import {EServerStatusSChangeButton} from "@enum/command/schange-command/EServerStatusSChangeButton";

/**
 * @class ServerStatusSChangeInteraction
 * @extends AbstractInteraction
 */
export default class ServerStatusSChangeInteraction extends AbstractInteraction {
  public id: string = ESChangeButton.SERVER_STATUS;
  public global: boolean = false;

  private readonly ACCEPT_ENTRY: string[] = [
    EServerStatusSChangeButton.ONLINE,
    EServerStatusSChangeButton.OFFLINE,
    EServerStatusSChangeButton.MAINTENANCE,
  ];

  public callback = async (content: string): Promise<void> => {
    if (!this.ACCEPT_ENTRY.includes(content)) throw new AppException('Invalid entry. Please try again.')
    await new MenuInfoService().updateStatus(this.client, revertInteractionIdToTranslation(content))
    await this.success(
      translator('The new **{TYPE}** has just been modified!', {
        TYPE: translator('Server Status')
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
            TYPE: translator('Server Status')
          }
        ),
        components: await this.buildButtons(ServerStatusSChangeCommandButton)
      }), this.callback.bind(this)
    );
  }
}

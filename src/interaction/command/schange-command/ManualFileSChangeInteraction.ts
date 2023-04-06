import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import translator from "@util/UtilTranslator";
import CanceledButton from "@component/button/CanceledButton";
import AbstractInteraction from "@abstract/AbstractInteraction";
import MenuInfoService from "@service/MenuInfoService";

/**
 * @class LauncherVersionSChangeInteraction
 * @extends AbstractInteraction
 */
export default class LauncherVersionSChangeInteraction extends AbstractInteraction {
  public id: string = ESChangeButton.MANUAL_FILES;
  public global: boolean = false

  public callback = async (content: string): Promise<void> => {
    await new MenuInfoService().updateManualFiles(this.client, content)
    await this.success(
      translator('The new **{TYPE}** has just been modified!', {
        TYPE: translator('Manual Files')
      })
    );
  }

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    return await this.messageButtonCollector(
      await this.send({
        content: translator(
          'Write the new **{TYPE}** of the menu',
          {
            TYPE: translator('Manual Files')
          }
        ),
        components: await this.buildButtons(CanceledButton)
      }), this.callback.bind(this)
    );
  }
}

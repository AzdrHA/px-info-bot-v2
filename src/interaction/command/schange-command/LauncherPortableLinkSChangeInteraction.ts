import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import translator from "@util/UtilTranslator";
import CanceledButton from "@component/button/CanceledButton";
import AbstractInteraction from "@abstract/AbstractInteraction";
import MenuInfoService from "@service/MenuInfoService";

/**
 * @class LauncherPortableLinkSChangeInteraction
 * @extends AbstractInteraction
 */
export default class LauncherPortableLinkSChangeInteraction extends AbstractInteraction {
  public id: string = ESChangeButton.LAUNCHER_PORTABLE_LINK;
  public global: boolean = false

  public callback = async (content: string): Promise<void> => {
    await new MenuInfoService().updateLauncherDownloadPortableLink(this.client, content)
    await this.success(
      translator('The new **{TYPE}** has just been modified!', {
        TYPE: translator('Launcher Portable Link')
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
            TYPE: translator('Launcher Portable Link')
          }
        ),
        components: await this.buildButtons(CanceledButton)
      }), this.callback.bind(this)
    );
  }
}

import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import translator from "@util/UtilTranslator";
import CanceledButton from "@component/button/CanceledButton";
import AbstractInteraction from "@abstract/AbstractInteraction";
import MenuInfoService from "@service/MenuInfoService";

/**
 * @class LauncherInstallerLinkSChangeInteraction
 * @extends AbstractInteraction
 */
export default class LauncherInstallerLinkSChangeInteraction extends AbstractInteraction {
  public id: string = ESChangeButton.LAUNCHER_INSTALLER_LINK;
  public global: boolean = false

  public callback = async (content: string): Promise<void> => {
    await new MenuInfoService().updateLauncherDownloadInstallerLink(this.client, content)
    await this.success(
      translator('The new **{TYPE}** has just been modified!', {
        TYPE: translator('Launcher Installer Link')
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
            TYPE: translator('Launcher Installer Link')
          }
        ),
        components: await this.buildButtons(CanceledButton)
      }), this.callback.bind(this)
    );
  }
}

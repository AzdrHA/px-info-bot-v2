import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import translator from "@util/UtilTranslator";
import CanceledButton from "@component/button/CanceledButton";
import AbstractInteraction from "@abstract/AbstractInteraction";
import MenuInfoService from "@service/MenuInfoService";
import {isVersionPattern} from "@util/UtilRegex";
import AppException from "@exception/AppException";

/**
 * @class VersionSChangeInteraction
 * @extends AbstractInteraction
 */
export default class VersionSChangeInteraction extends AbstractInteraction {
  public id: string = ESChangeButton.VERSION;
  public global: boolean = false

  public callback = async (content: string): Promise<void> => {
    if (!isVersionPattern(content)) throw new AppException('The version must be in the format: v.X.X.X')
    await new MenuInfoService().updateVersion(this.client, content)
    await this.success(
      translator('The new **{TYPE}** has just been modified!', {
        TYPE: translator(content)
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
          'Write the new **Version** of the menu: (Format: v.X.X.X)',
          {
            TYPE: translator('Status')
          }
        ),
        components: await this.buildButtons(CanceledButton)
      }), this.callback.bind(this)
    );
  }
}

import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import translator from "@util/UtilTranslator";
import CanceledButton from "@component/button/CanceledButton";
import AbstractInteraction from "@abstract/AbstractInteraction";
import MenuInfoService from "@service/MenuInfoService";
import {isDatePattern} from "@util/UtilRegex";
import AppException from "@exception/AppException";

/**
 * @class ReleaseDateSChangeInteraction
 * @extends AbstractInteraction
 */
export default class ReleaseDateSChangeInteraction extends AbstractInteraction {
  public id: string = ESChangeButton.RELEASE_DATE;
  public global: boolean = false

  public callback = async (content: string): Promise<void> => {
    if (!isDatePattern(content)) throw new AppException('The date format is not valid! (Format: day-month-year)')
    await new MenuInfoService().updateReleaseDate(this.client, content)
    await this.success(
      translator('The new **{TYPE}** has just been modified!', {
        TYPE: translator('Release Date')
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
          'Write the new **Release Date** of the menu: (Format: day-month-year)',
          {
            TYPE: translator('Release Date')
          }
        ),
        components: await this.buildButtons(CanceledButton)
      }), this.callback.bind(this)
    );
  }
}

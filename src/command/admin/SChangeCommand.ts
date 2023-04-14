import AbstractCommand from '@abstract/AbstractCommand';
import {EPermission} from "@enum/EPermission";
import translator from "@util/UtilTranslator";
import SChangeCommandButton from "@component/button/command/schange-command/SChangeCommandButton";

/**
 * @class SChangeCommand
 * @extends AbstractCommand
 */
export default class SChangeCommand extends AbstractCommand {
  public alias: string[] = ['schange'];
  public permission: EPermission = EPermission.ADMINISTRATOR;

  /**
   * @public
   * @returns {Promise<any>}
   * @description Run the command
   */
  public async run(): Promise<any> {
    return await this.buttonCollector(
      await this.send({
        content: translator('What **Settings** would you like to change?'),
        components: await this.buildButtons(SChangeCommandButton)
      })
    );
  }
}

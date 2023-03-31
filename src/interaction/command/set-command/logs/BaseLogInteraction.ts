import AbstractInteraction from '@abstract/AbstractInteraction';
import { ESetCommand } from '@enum/command/ESetCommand';
import translator from '@util/UtilTranslator';
import LogSetCommandButton from '@component/button/command/set-command/LogSetCommandButton';

/**
 * @class BaseLogInteraction
 * @extends AbstractInteraction
 */
export default class BaseLogInteraction extends AbstractInteraction {
  public global: boolean = false;
  public id: string = ESetCommand.LOGS;

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    return await this.buttonCollector(
      await this.send({
        content: translator(
          'What **{TYPE}** settings would you like to change?',
          {
            TYPE: translator('Logs')
          }
        ),
        components: await this.buildButtons(LogSetCommandButton)
      })
    );
  }
}

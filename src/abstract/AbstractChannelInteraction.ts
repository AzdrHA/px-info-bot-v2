import AbstractInteraction from '@abstract/AbstractInteraction';
import translator from '@util/UtilTranslator';
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder';
import CancelButton from '@component/button/CancelButton';
import {type Callback} from "@abstract/AbstractAction";

/**
 * @abstract
 * @class AbstractChannelInteraction
 * @extends AbstractInteraction
 */
export default abstract class AbstractChannelInteraction extends AbstractInteraction {
  protected abstract channel: string;
  protected abstract callback: Callback

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    return await this.messageButtonCollector(
      await this.send({
        content: translator(
          'Send the ID or mention the **{TYPE}** channel you want to use',
          {
            TYPE: translator(this.channel)
          }
        ),
        components: [
          new DefaultButtonRowBuilder().setComponents(new CancelButton())
        ]
      }),
      this.callback.bind(this)
    );
  }
}

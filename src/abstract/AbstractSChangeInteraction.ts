import AbstractInteraction from "@abstract/AbstractInteraction";
import translator from "@util/UtilTranslator";
import {type Callback} from "@abstract/AbstractAction";
import type DefaultCanceledButtonBuilder from "@component/button-builder/DefaultCanceledButtonBuilder";

/**
 * @class AbstractSChangeInteraction
 * @extends AbstractInteraction
 */
export default abstract class AbstractSChangeInteraction extends AbstractInteraction {
  public global: boolean = false;
  abstract buttons: typeof DefaultCanceledButtonBuilder;
  abstract key: string;
  public message = 'What **{TYPE}** settings would you like to change?'

  abstract callback: Callback;

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    return await this.buttonCollector(
      await this.send({
        content: translator(
          this.message,
          {
            TYPE: translator(this.key)
          }
        ),
        components: await this.buildButtons(this.buttons)
      }), this.callback.bind(this)
    );
  }
}
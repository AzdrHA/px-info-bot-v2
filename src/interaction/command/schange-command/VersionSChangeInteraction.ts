import AbstractSChangeInteraction from "@abstract/AbstractSChangeInteraction";
import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";
import translator from "@util/UtilTranslator";
import CanceledButton from "@component/button/CanceledButton";

/**
 * @class VersionSChangeInteraction
 * @extends AbstractInteraction
 */
export default class VersionSChangeInteraction extends AbstractSChangeInteraction {
  public id: string = ESChangeButton.VERSION;
  public buttons = CanceledButton;
  public key: string = 'Status';
  public message = 'Write the new **Version** of the menu: (Format: v.X.X.X)'

  public callback = async (content: string): Promise<void> => {
    console.log('test')
    // await new MenuInfoService().updateStatus(this.client, revertInteractionIdToTranslation(content))
    await this.success(
      translator('The new **{TYPE}** has just been modified!', {
        TYPE: translator(content)
      })
    );
  }
}

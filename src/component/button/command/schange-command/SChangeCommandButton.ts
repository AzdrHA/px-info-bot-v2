import DefaultCanceledButtonBuilder from "@component/button-builder/DefaultCanceledButtonBuilder";
import {ButtonBuilder, ButtonStyle} from "discord.js";
import translator from "@util/UtilTranslator";
import {ESChangeButton} from "@enum/command/schange-command/ESChangeButton";

/**
 * @class SetCommandButton
 * @extends DefaultButtonBuilder
 */
export default class SChangeCommandButton extends DefaultCanceledButtonBuilder {
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Status'),
        style: ButtonStyle.Primary,
        customId: ESChangeButton.STATUS
      }),new ButtonBuilder({
        label: translator('DStatus'),
        style: ButtonStyle.Primary,
        customId: ESChangeButton.D_STATUS
      }),
    ];
  };
}

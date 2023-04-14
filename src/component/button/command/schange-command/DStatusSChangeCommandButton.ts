import DefaultCanceledButtonBuilder from "@component/button-builder/DefaultCanceledButtonBuilder";
import {ButtonBuilder, ButtonStyle} from "discord.js";
import translator from "@util/UtilTranslator";
import {EDStatusSChangeButton} from "@enum/command/schange-command/EDStatusSChangeButton";

/**
 * @class DStatusSChangeCommandButton
 * @extends DefaultButtonBuilder
 */
export default class DStatusSChangeCommandButton extends DefaultCanceledButtonBuilder {
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Undetected'),
        style: ButtonStyle.Primary,
        customId: EDStatusSChangeButton.UNDETECTED
      }),
      new ButtonBuilder({
        label: translator('Detected'),
        style: ButtonStyle.Primary,
        customId: EDStatusSChangeButton.DETECTED
      }),
      new ButtonBuilder({
        label: translator('Risky'),
        style: ButtonStyle.Primary,
        customId: EDStatusSChangeButton.RISKY
      }),
    ];
  };
}

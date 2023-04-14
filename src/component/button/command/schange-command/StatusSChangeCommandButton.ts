import DefaultCanceledButtonBuilder from "@component/button-builder/DefaultCanceledButtonBuilder";
import {ButtonBuilder, ButtonStyle} from "discord.js";
import translator from "@util/UtilTranslator";
import {EStatusSChangeButton} from "@enum/command/schange-command/EStatusSChangeButton";

/**
 * @class SetCommandButton
 * @extends DefaultButtonBuilder
 */
export default class StatusSChangeCommandButton extends DefaultCanceledButtonBuilder {
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Online'),
        style: ButtonStyle.Primary,
        customId: EStatusSChangeButton.ONLINE
      }),
      new ButtonBuilder({
        label: translator('Offline'),
        style: ButtonStyle.Primary,
        customId: EStatusSChangeButton.OFFLINE
      }),
      new ButtonBuilder({
        label: translator('Maintenance'),
        style: ButtonStyle.Primary,
        customId: EStatusSChangeButton.MAINTENANCE
      }),
      new ButtonBuilder({
        label: translator('Testing'),
        style: ButtonStyle.Primary,
        customId: EStatusSChangeButton.TESTING
      }),
    ];
  };
}

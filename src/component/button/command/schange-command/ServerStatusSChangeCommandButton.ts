import DefaultCanceledButtonBuilder from "@component/button-builder/DefaultCanceledButtonBuilder";
import {ButtonBuilder, ButtonStyle} from "discord.js";
import translator from "@util/UtilTranslator";
import {EServerStatusSChangeButton} from "@enum/command/schange-command/EServerStatusSChangeButton";

/**
 * @class SetCommandButton
 * @extends DefaultButtonBuilder
 */
export default class ServerStatusSChangeCommandButton extends DefaultCanceledButtonBuilder {
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Online'),
        style: ButtonStyle.Primary,
        customId: EServerStatusSChangeButton.ONLINE
      }),
      new ButtonBuilder({
        label: translator('Offline'),
        style: ButtonStyle.Primary,
        customId: EServerStatusSChangeButton.OFFLINE
      }),
      new ButtonBuilder({
        label: translator('Maintenance'),
        style: ButtonStyle.Primary,
        customId: EServerStatusSChangeButton.MAINTENANCE
      }),
    ];
  };
}

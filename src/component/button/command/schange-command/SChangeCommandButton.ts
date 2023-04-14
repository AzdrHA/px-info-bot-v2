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
      }),
      new ButtonBuilder({
        label: translator('DStatus'),
        style: ButtonStyle.Primary,
        customId: ESChangeButton.D_STATUS
      }),
      new ButtonBuilder({
        label: translator('Version'),
        style: ButtonStyle.Primary,
        customId: ESChangeButton.VERSION
      }),
      new ButtonBuilder({
        label: translator('Launcher Version'),
        style: ButtonStyle.Primary,
        customId: ESChangeButton.LAUNCHER_VERSION
      }),
      new ButtonBuilder({
        label: translator('Manual Files'),
        style: ButtonStyle.Primary,
        customId: ESChangeButton.MANUAL_FILES
      }),
      new ButtonBuilder({
        label: translator('Server Status'),
        style: ButtonStyle.Primary,
        customId: ESChangeButton.SERVER_STATUS
      }),
      new ButtonBuilder({
        label: translator('Launcher Installer Link'),
        style: ButtonStyle.Primary,
        customId: ESChangeButton.LAUNCHER_INSTALLER_LINK
      }),
      new ButtonBuilder({
        label: translator('Launcher Portable Link'),
        style: ButtonStyle.Primary,
        customId: ESChangeButton.LAUNCHER_PORTABLE_LINK
      })
    ];
  };
}

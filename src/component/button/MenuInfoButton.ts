import {ButtonBuilder, ButtonStyle} from "discord.js";
import DefaultButtonBuilder from "@component/button-builder/DefaultButtonBuilder";
import {DISCORD_LINK, PXL_DOWNLOAD_LINK, VK_LINK, WEBSITE_LINK} from "@config/Constant";
import translator from "@util/UtilTranslator";

/**
 * @class MenuInfoButton
 * @extends DefaultButtonBuilder
 */
export default class MenuInfoButton extends DefaultButtonBuilder {
  /**
   * @public
   * @returns {Promise<ButtonBuilder[]>}
   */
  public async initializeButton(): Promise<ButtonBuilder[]> {
    return [
      new ButtonBuilder({
        label: translator('Discord Invite'),
        style: ButtonStyle.Link,
        url: DISCORD_LINK
      }),
      new ButtonBuilder({

        label: translator('Website VK'),
        style: ButtonStyle.Link,
        url: VK_LINK
      }),
      new ButtonBuilder({
        label: translator('Website'),
        style: ButtonStyle.Link,
        url: WEBSITE_LINK
      }),
      new ButtonBuilder({
        label: translator('Download'),
        style: ButtonStyle.Link,
        url: PXL_DOWNLOAD_LINK
      }),
    ];
  }
}

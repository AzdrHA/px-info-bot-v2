import {type ButtonBuilder} from "discord.js";
import DefaultCanceledButtonBuilder from "@component/button-builder/DefaultCanceledButtonBuilder";

/**
 * @class CanceledButton
 * @extends DefaultCanceledButtonBuilder
 */
export default class CanceledButton extends DefaultCanceledButtonBuilder {
  /**
   * @method initializeButton
   * @description Initialize the button
   */
  async initializeButton(): Promise<ButtonBuilder[]> {
    return [];
  }
}

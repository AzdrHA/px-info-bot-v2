import { type ButtonBuilder } from 'discord.js';
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder';
import CancelButton from '@component/button/CancelButton';

/**
 * @abstract
 * Class DefaultCanceledButtonBuilder
 */
export default abstract class DefaultCanceledButtonBuilder {
  private readonly buttons: ButtonBuilder[] = [];

  public buildButton = async (): Promise<DefaultButtonRowBuilder[]> => {
    const res = [];

    (await this.initializeButton()).forEach((button, i) => {
      this.buttons.push(button);
      if (i % 5 === 4) {
        res.push(new DefaultButtonRowBuilder().setComponents(this.buttons));
        this.buttons.splice(0, this.buttons.length);
      }
    });

    res.push(
      new DefaultButtonRowBuilder().setComponents(
        ...this.buttons,
        new CancelButton()
      )
    );
    this.buttons.splice(0, this.buttons.length);
    return res;
  };

  public abstract initializeButton(): Promise<ButtonBuilder[]>;
}

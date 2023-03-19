import { ButtonBuilder, ButtonStyle } from 'discord.js'
import DefaultButtonRowBuilder from '../row-builder/DefaultButtonRowBuilder'
import translator from '../../util/UtilTranslator'
import { EGlobalButton } from '../../enum/EGlobalButton'

/**
 * @abstract
 * Class DefaultCanceledButtonBuilder
 */
export default abstract class DefaultCanceledButtonBuilder {
  private readonly buttons: ButtonBuilder[] = []

  public buildButton = async (): Promise<DefaultButtonRowBuilder[]> => {
    const res = [];

    (await this.initializeButton()).forEach((button, i) => {
      this.buttons.push(button)
      if (i % 5 === 4) {
        res.push(new DefaultButtonRowBuilder().setComponents(this.buttons))
        this.buttons.splice(0, this.buttons.length)
      }
    })

    if (this.buttons.length > 0) {
      res.push(new DefaultButtonRowBuilder().setComponents(...this.buttons, new ButtonBuilder({
        label: translator('Cancel'),
        style: ButtonStyle.Danger,
        customId: EGlobalButton.CANCEL
      })))
      this.buttons.splice(0, this.buttons.length)
    }
    return res
  }

  public abstract initializeButton (): Promise<ButtonBuilder[]>
}

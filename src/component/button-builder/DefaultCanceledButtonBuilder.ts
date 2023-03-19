import { ButtonBuilder, type ButtonComponentData } from 'discord.js'
import DefaultButtonRowBuilder from '../row-builder/DefaultButtonRowBuilder'
import DefaultCanceledButtonRowBuilder from '../row-builder/DefaultCanceledButtonRowBuilder'

/**
 * @abstract
 * Class DefaultCanceledButtonBuilder
 */
export default abstract class DefaultCanceledButtonBuilder {
  private buttons = []
  /**
   * @protected
   * @return {DefaultButtonRowBuilder[]}
   */
  public buildButton = async (): Promise<DefaultButtonRowBuilder[]> => {
    const res = []
    const buttons = await this.initializeButton()
    let it = 0
    buttons.forEach((button, i) => {
      this.buttons.push(button)
      if ((i + 1) % 5 === 0 && i) {
        it = i + 1
        res.push(
          new DefaultButtonRowBuilder().setComponents(
            this.components(this.buttons)
          )
        )
        this.buttons = []
      }
    })

    res.push(
      new DefaultCanceledButtonRowBuilder().setComponents(
        this.components(buttons.slice(it))
      )
    )
    return res
  }

  /**
   * @private
   * @param {ButtonComponentData[]} buttons
   * @return {ButtonBuilder[]}
   */
  private readonly components = (
    buttons: Array<Partial<ButtonComponentData>>
  ): ButtonBuilder[] => {
    return buttons.map((data) => new ButtonBuilder(data))
  }

  public abstract initializeButton (): Promise<Array<Partial<ButtonComponentData>>>
}

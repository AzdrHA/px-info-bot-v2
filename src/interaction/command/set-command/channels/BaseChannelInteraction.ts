import AbstractInteraction from '@abstract/AbstractInteraction'
import { ESetCommand } from '@enum/command/ESetCommand'
import translator from '@util/UtilTranslator'
import ChannelSetCommandButtonBuilder from '@component/button/command/set/ChannelSetCommandButtonBuilder'

/**
 * @class BaseChannelInteraction
 * @extends AbstractInteraction
 */
export default class BaseChannelInteraction extends AbstractInteraction {
  public global: boolean = false
  public id: string = ESetCommand.CHANNELS

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run (): Promise<any> {
    return await this.buttonCollector(await this.send({
      content: translator('What **{TYPE}** settings would you like to change?', {
        TYPE: translator('Channels')
      }),
      components: await this.buildButtons(ChannelSetCommandButtonBuilder)
    }))
  }
}

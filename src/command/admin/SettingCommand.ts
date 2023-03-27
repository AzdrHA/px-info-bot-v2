import AbstractCommand from '@abstract/AbstractCommand'
import { SettingEmbedBuilder } from '@component/embed-builder/SettingEmbedBuilder'

/**
 * @class SettingCommand
 * @description The setting command
 * @extends AbstractCommand
 */
export default class SettingCommand extends AbstractCommand {
  public alias: string[] = ['setting', 'settings']

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run (): Promise<any> {
    return await this.send({ embeds: [await SettingEmbedBuilder()] })
  }
}

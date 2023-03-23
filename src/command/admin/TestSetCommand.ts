import { ButtonBuilder, ButtonStyle, type Message } from 'discord.js'
import AbstractCommand from '@abstract/AbstractCommand'
import translator from '@util/UtilTranslator'
import { EPermission } from '@enum/EPermission'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'
import DefaultButtonBuilder from '@component/button-builder/DefaultButtonBuilder'
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'

/**
 * @class SetCommand
 * @extends AbstractCommand
 */
export default class TestSetCommand extends AbstractCommand {
  public alias: string[] = ['setset']
  public description: string = 'Set a value for a key'
  public usage: string = 'set <key> <value>'
  public permission: EPermission = EPermission.ADMINISTRATOR

  /**
   * @public
   * @returns {Promise<void>}
   */
  public async run (): Promise<Message> {
    await this.delete()

    const callback = (message: Message) => {
      console.log(message.content)
    }

    return await this.messageCollector(await this.send({
      content: translator('WRITE_A_MESSAGE'),
      components: [
        new DefaultButtonRowBuilder().setComponents([
          new ButtonBuilder({
            label: 'Test',
            style: ButtonStyle.Primary,
            customId: 'fsqfqsfsq45fqs45f4qs56fq4s65f4qs'
          })
        ])
      ]
    }), callback)
  }
}

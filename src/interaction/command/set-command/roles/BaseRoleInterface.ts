import AbstractInteraction from '@abstract/AbstractInteraction'
import { ESetCommand } from '@enum/command/ESetCommand'
import translator from '@util/UtilTranslator'
import RoleSetCommandButtonBuilder from '@component/button/command/set/RoleSetCommandButtonBuilder'

/**
 * @class BaseRoleInterface
 * @extends AbstractInteraction
 */
export default class BaseRoleInterface extends AbstractInteraction {
  public global: boolean = false
  public id: string = ESetCommand.ROLES

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run (): Promise<any> {
    return await this.buttonCollector(await this.send({
      content: translator('What **{TYPE}** settings would you like to change?', {
        TYPE: translator('Roles')
      }),
      components: await this.buildButtons(RoleSetCommandButtonBuilder)
    }))
  }
}

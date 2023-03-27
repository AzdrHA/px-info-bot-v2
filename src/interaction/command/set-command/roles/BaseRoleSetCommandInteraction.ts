import AbstractInteraction from '@abstract/AbstractInteraction'
import { ESetCommand } from '@enum/command/ESetCommand'
import translator from '@util/UtilTranslator'
import RoleSetCommandButtonBuilder from '@component/button/command/set/RoleSetCommandButtonBuilder'

/**
 * @class BaseRoleSetCommandInteraction
 * @extends AbstractInteraction
 */
export default class BaseRoleSetCommandInteraction extends AbstractInteraction {
  public global: boolean = false
  public id: string = ESetCommand.ROLES

  public async run (): Promise<any> {
    return await this.buttonCollector(await this.send({
      content: translator('What **{TYPE}** settings would you like to change?', {
        TYPE: translator('Roles')
      }),
      components: await this.buildButtons(RoleSetCommandButtonBuilder)
    }))
  }
}

import AbstractCommand from '@abstract/AbstractCommand';
import { isBadName } from '@util/UtilRegex';
import type Client from '@/Client';
import { type Message } from 'discord.js';
import GuildMemberService from '@service/GuildMemberService';
import translator from '@util/UtilTranslator';

/**
 * @class CheckHoiperCommand
 * @description The check hoiper command
 * @extends AbstractCommand
 */
export default class CheckHoiperCommand extends AbstractCommand {
  public alias: string[] = ['checkhoiper'];

  /**
   * @constructor
   * @description The constructor of the check hoiper command
   * @param {Client} client
   * @param {Message<true>} message
   * @param {GuildMemberService} guildMemberService
   */
  public constructor(
    client: Client,
    message: Message<true>,
    private readonly guildMemberService = new GuildMemberService()
  ) {
    super(client, message);
  }

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    const message = await this.send(translator('Checking members...'));
    let i = 0;
    const members = await this.message.guild.members.fetch();
    const filter = members.filter((member) => isBadName(member.displayName));
    await message.edit(
      translator('Found {SIZE} members with bad name', {
        SIZE: filter.size.toString()
      })
    );
    for (const member of filter.values()) {
      try {
        await this.guildMemberService.checkAntiHoist(member, true);
        i++;
      } catch (error) {}
    }
    return await message.edit(
      translator(
        '{SUCCESS_SIZE} member.s renamed. {FAIL_SIZE} member.s cannot be renamed.',
        {
          SUCCESS_SIZE: i.toString(),
          FAIL_SIZE: (filter.size - i).toString()
        }
      )
    );
  }
}

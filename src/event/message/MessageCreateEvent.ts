import AbstractEvent from '../../abstract/AbstractEvent'
import { type Message, userMention } from 'discord.js'
import { ENodeEnv } from '../../enum/ENodeEnv'
import { DEVELOPERS } from '../../config/AppConfig'
import { DONT_PING_ME } from '../../config/EmojiConfig'
import { COMMAND_LIST } from '../../config/Constant'
import type AbstractCommand from '../../abstract/AbstractCommand'

/**
 * @class MessageCreateEvent
 * @extends AbstractEvent
 */
export default class MessageCreateEvent extends AbstractEvent {
  /**
   * @public
   * @param {Message} message
   * @returns {Promise<Message>}
   */
  public async run (message: Message): Promise<Message | false> {
    // Ignore bot messages
    if (message.author.bot) return false

    // Ignore message form people who are not developer in dev mode
    if (process.env.NODE_ENV === ENodeEnv.DEVELOPMENT && !DEVELOPERS.includes(message.author.id)) return false

    // Reply to message if mention the bot
    if (message.content.includes(userMention(this.client.user?.id as string))) {
      return await message.reply(DONT_PING_ME)
    }

    // Ignore message that don't start with the prefix (in config.json)
    if (message.content.indexOf(this.client.prefix) !== 0) return false

    // Separate "command" name, and the "arguments"
    const args: string[] = message.content.slice(this.client.prefix.length).trim().split(/ +/g)
    const name = args.shift()

    // Ignore if name is empty
    if (name == null) return false

    // Get the command
    const command: AbstractCommand | null = COMMAND_LIST.get(name.toLowerCase())

    // Ignore if command is not found
    if (command == null) return false

    // add attribute args, message to command
    command.args = args
    command.message = message

    // Check if the user has permission to run the command
    if ((await command.hasPermission()) === false) {
      return await message.reply('You don\'t have permission to run this command!')
    }

    // Run the command
    return await command.run()
  }
}

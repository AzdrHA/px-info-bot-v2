import MessageCreateEvent from '../../../src/event/message/MessageCreateEvent'
import Client from '../../../src/Client'
import { DISCORD_PREFIX, DISCORD_TOKEN } from '../../../src/config/AppConfig'
import { type Message } from 'discord.js'
import { ENodeEnv } from '../../../src/enum/ENodeEnv'
import { DONT_PING_ME } from '../../../src/config/EmojiConfig'
import { COMMAND_LIST } from '../../../src/config/Constant'

describe('MessageCreateEvent', () => {
  let event: MessageCreateEvent
  let client: Client
  let mockMessage: Message

  beforeEach(() => {
    client = new Client({
      prefix: DISCORD_PREFIX,
      token: DISCORD_TOKEN,
      intents: [],
      partials: [],
      autoStart: false
    })
    event = new MessageCreateEvent(client)

    mockMessage = {
      author: {
        bot: false,
        id: '123456789'
      },
      content: '-ping arg1 arg2',
      reply: jest.fn()
    } as any
  })

  it('should return the original message if the author is a bot', async () => {
    const botMessage: Message = {
      author: {
        bot: true
      }
    } as any

    const result = await event.run(botMessage)
    expect(result).toBeFalsy()
  })

  it('should return the original message if the author is not a developer in development mode', async () => {
    process.env.NODE_ENV = ENodeEnv.DEVELOPMENT
    const result = await event.run(mockMessage)
    expect(result).toBeFalsy()
    process.env.NODE_ENV = ENodeEnv.TEST
  })

  it('should reply with a message if the bot is mentioned in the message', async () => {
    const botMentionedMessage = {
      ...mockMessage,
      content: `<@${client.user?.id as string}>`
    } as any

    await event.run(botMentionedMessage)
    expect(botMentionedMessage.reply).toHaveBeenCalledWith(DONT_PING_ME)
  })

  it('should return the original message if it does not start with the prefix', async () => {
    const noPrefixMessage = {
      ...mockMessage,
      content: 'testCommand arg1 arg2'
    } as any

    const result = await event.run(noPrefixMessage)
    expect(result).toBeFalsy()
  })

  it('should return the original message if the command is not found', async () => {
    const unknownCommandMessage = {
      ...mockMessage,
      content: '-unknownCommand arg1 arg2'
    } as any

    const result = await event.run(unknownCommandMessage)
    expect(result).toBeFalsy()
  })

  it('should return the original message if the command name is null', async () => {
    const nullNameMessage = {
      ...mockMessage,
      content: '-null arg1 arg2'
    } as any

    const result = await event.run(nullNameMessage)
    expect(result).toBeFalsy()
  })

  it('should run the command if the message is valid', async () => {
    const command = {
      run: jest.fn(),
      hasPermission: jest.fn().mockReturnValue(true)
    } as any

    const validMessage = {
      ...mockMessage,
      content: '-ping arg1 arg2'
    } as any

    COMMAND_LIST.set('ping', command)
    command.client = client
    command.args = ['arg1', 'arg2']
    await event.run(validMessage)
    expect(command.run).toHaveBeenCalled()
  })

  // it('should reply with a message if the member does not have permission to run support the command', async () => {
  //   const validMessage = {
  //     ...mockMessage,
  //     content: '-ping arg1 arg2'
  //   } as any
  //
  //   const command: PingCommand = {
  //     run: jest.fn(),
  //     hasPermission: jest.fn().mockReturnValue(false),
  //     client,
  //     message: validMessage as Message,
  //     alias: [],
  //     args: [],
  //     description: '',
  //     usage: '',
  //     permission: EPermission.SUPPORT
  //   }
  //
  //   const spy = jest.fn(command.prototype.hasPermission)
  //
  //   COMMAND_LIST.set('ping', command)
  //   command.client = client
  //   const res = await event.run(validMessage)
  //   expect(command.run).not.toHaveBeenCalled()
  //   expect(validMessage.reply).toHaveBeenCalled()
  //   expect(validMessage.reply).toHaveBeenCalledWith('You don\'t have permission to run this command!')
  //   expect(res).toBeUndefined()
  // })
})

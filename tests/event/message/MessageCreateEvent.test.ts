import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'
import { type Message } from 'discord.js'
import Client from '@/Client'
import MessageCreateEvent from '@event/message/MessageCreateEvent'
import { ENodeEnv } from '@enum/ENodeEnv'
import { DEVELOPERS, DISCORD_PREFIX, DISCORD_TOKEN } from '@config/AppConfig'
import { DONT_PING_ME } from '@config/EmojiConfig'
import { COMMAND_LIST } from '@config/Constant'
import type AbstractCommand from '@abstract/AbstractCommand'

describe('MessageCreateEvent', () => {
  let client: Client
  let mockMessage: Message
  let event: MessageCreateEvent
  let command: AbstractCommand

  beforeAll(() => {
    client = new Client({
      prefix: DISCORD_PREFIX,
      token: DISCORD_TOKEN,
      intents: [],
      partials: [],
      autoStart: false
    })
  })

  beforeEach(() => {
    mockMessage = {
      author: {
        bot: false,
        id: DEVELOPERS[0]
      },
      content: '-ping arg1 arg2',
      reply: vi.fn()
    } as any
    event = new MessageCreateEvent(client)
    command = {
      hasPermission: vi.fn().mockResolvedValue(true),
      run: vi.fn().mockResolvedValue(true)
    } as any
    COMMAND_LIST.set('ping', command)
  })

  afterEach(() => {
    vi.resetAllMocks()
    COMMAND_LIST.delete('ping')
  })

  afterAll(() => {
    client.destroy()
  })

  it('should return false if the author of message is a bot', async () => {
    mockMessage.author.bot = true
    expect(await event.run(mockMessage)).toBeFalsy()
  })

  it('should return "false" if the author is not from a developer in development mode', async () => {
    process.env.NODE_ENV = ENodeEnv.DEVELOPMENT
    mockMessage.author.id = 'not_a_developer'
    expect(await event.run(mockMessage)).toBeFalsy()
    process.env.NODE_ENV = ENodeEnv.TEST
  })

  it('should reply with a message if the bot is mentioned in the message', async () => {
    mockMessage.content = `test <@${client.user?.id as string}> test`
    await event.run(mockMessage)
    expect(mockMessage.reply).toHaveBeenCalledWith(DONT_PING_ME)
  })

  it('should return "false" if the message does not start with the prefix', async () => {
    mockMessage.content = 'ping arg1 arg2'
    expect(await event.run(mockMessage)).toBeFalsy()
  })

  it('should return "false" if the command is not found', async () => {
    mockMessage.content = '-not_a_command arg1 arg2'
    expect(await event.run(mockMessage)).toBeFalsy()
  })

  it('should return "false" if the command name is empty', async () => {
    mockMessage.content = '-'
    expect(await event.run(mockMessage)).toBeFalsy()
  })

  it('should set the "args" and "message" attribute of the command', async () => {
    await event.run(mockMessage)
    expect(command.args).toEqual(['arg1', 'arg2'])
    expect(command.message).toEqual(mockMessage)
  })

  it('should return "false" if the user does not have permission to run the command', async () => {
    command.hasPermission = vi.fn().mockResolvedValue(false)
    await event.run(mockMessage)
    expect(mockMessage.reply).toHaveBeenCalledWith('You don\'t have permission to run this command!')
  })

  it('should call InteractionService.run if the interaction is valid', async () => {
    const spy = vi.spyOn(event, 'run')
    await event.run(mockMessage)
    expect(spy).toHaveBeenCalled()
  })
})

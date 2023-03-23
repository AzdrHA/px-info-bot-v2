import { type BaseInteraction } from 'discord.js'
import { SUPPORT_DISCORD } from '@config/AppConfig'
import { ENodeEnv } from '@enum/ENodeEnv'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import InteractionCreateEvent from '@event/interaction/InteractionCreateEvent'
import type Client from '@/Client'

vi.mock('@service/InteractionService')
vi.mock('@config/AppConfig')

describe('InteractionCreateEvent', () => {
  let interaction: BaseInteraction
  let event: InteractionCreateEvent
  let client: Client

  beforeEach(() => {
    interaction = {
      guildId: SUPPORT_DISCORD,
      isButton: vi.fn(() => true),
      user: { id: 'abc123' },
      channel: { send: vi.fn() }
    } as unknown as BaseInteraction
    event = new InteractionCreateEvent(client)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('run', () => {
    it('should return "11" if the interaction is from another guild', async () => {
      interaction.guildId = 'another_guild'
      const result = await event.run(interaction)
      expect(result).toEqual('11')
    })

    it('should return "22" if the interaction is not from a developer in development mode', async () => {
      process.env.NODE_ENV = ENodeEnv.DEVELOPMENT
      interaction.user.id = 'not_a_developer'
      const result = await event.run(interaction)
      expect(result).toEqual('22')
      process.env.NODE_ENV = ENodeEnv.TEST
    })

    it('should return "333" if the interaction is not a button', async () => {
      interaction.isButton = vi.fn(() => false)
      const result = await event.run(interaction)
      expect(result).toEqual('333')
    })

    it('should call InteractionService.run if the interaction is valid', async () => {
      const spy = vi.spyOn(event, 'run')
      await event.run(interaction)
      expect(spy).toHaveBeenCalled()
    })
  })
})

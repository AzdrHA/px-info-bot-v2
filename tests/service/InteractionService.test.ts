import { describe, it, expect, beforeAll, beforeEach, afterAll, vi } from 'vitest'
import InteractionService from '@service/InteractionService'
import { type ButtonInteraction } from 'discord.js'
import { INTERACTION_LIST } from '@config/Constant'

describe('InteractionService', () => {
  let interactionService: InteractionService
  let interaction: ButtonInteraction

  beforeAll(() => {
    interactionService = new InteractionService()

    INTERACTION_LIST.set('test/i', {
      global: false,
      setInteraction: vi.fn(),
      run: vi.fn()
    })
  })

  beforeEach(() => {
    interaction = {
      customId: 'test/i'
    } as any
  })

  afterAll(() => {
    INTERACTION_LIST.clear()
  })

  it('should return false if interaction is not found', async () => {
    interaction.customId = 'test/ii'
    expect(await interactionService.run(interaction)).toBeFalsy()
  })

  it('should return false if interaction is not global', async () => {
    expect(await interactionService.run(interaction, true)).toBeFalsy()
  })
})

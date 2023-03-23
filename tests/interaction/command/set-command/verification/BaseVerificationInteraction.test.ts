import { beforeAll, describe, expect, it } from 'vitest'
import type Client from '@/Client'
import { type ButtonInteraction } from 'discord.js'
import BaseVerificationInteraction from '@interaction/command/set-command/verification/BaseVerificationInteraction'
import { ESetCommandButton } from '@enum/command/ESetCommandButton'

describe('BaseVerificationInteraction', () => {
  let button: BaseVerificationInteraction
  let client: Client
  let buttonInteraction: ButtonInteraction

  beforeAll(() => {
    button = new BaseVerificationInteraction(client, buttonInteraction)
  })

  it('should have the correct id', () => {
    expect(button.id).toBe(ESetCommandButton.VERIFICATION)
  })

  it('should have the correct global', () => {
    expect(button.global).toBe(false)
  })
})

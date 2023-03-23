import { describe, it, expect, beforeAll, vi } from 'vitest'
import VerifyButton from '@interaction/global/verification/VerifyButton'
import type Client from '@/Client'
import { type ButtonInteraction } from 'discord.js'
import { EVerificationButton } from '@enum/EVerificationButton'

describe('VerifyButton', () => {
  let verifyButton: VerifyButton
  let client: Client
  let buttonInteraction: ButtonInteraction

  beforeAll(() => {
    verifyButton = new VerifyButton(client, buttonInteraction)
  })

  it('should have the correct id', () => {
    expect(verifyButton.id).toBe(EVerificationButton.VERIFY)
  })

  it('should have the correct global', () => {
    expect(verifyButton.global).toBe(false)
  })

  it('should have the correct run method', () => {
    const spy = vi.spyOn(verifyButton, 'run')
    void verifyButton.run()
    expect(spy).toBeCalled()
  })
})

import { describe, it, expect, beforeAll, vi } from 'vitest';
import VerifyInteraction from '@interaction/global/verification/VerifyInteraction';
import type Client from '@/Client';
import { type ButtonInteraction } from 'discord.js';
import { EGlobalButton } from '@enum/EGlobalButton';

describe('VerifyButton', () => {
  let verifyButton: VerifyInteraction;
  let client: Client;
  let buttonInteraction: ButtonInteraction;

  beforeAll(() => {
    verifyButton = new VerifyInteraction(client, buttonInteraction);
  });

  it('should have the correct id', () => {
    expect(verifyButton.id).toBe(EGlobalButton.VERIFY);
  });

  it('should have the correct global', () => {
    expect(verifyButton.global).toBeTruthy();
  });

  it('should have the correct run method', () => {
    const spy = vi.spyOn(verifyButton, 'run');
    void verifyButton.run();
    expect(spy).toBeCalled();
  });
});

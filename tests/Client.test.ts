import Client from '../src/Client';
import { DISCORD_PREFIX, DISCORD_TOKEN } from '@config/AppConfig';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Client', () => {
  let client: Client;

  beforeAll(() => {
    client = new Client({
      prefix: DISCORD_PREFIX,
      token: DISCORD_TOKEN,
      intents: [],
      partials: []
    });
  });

  afterAll(() => {
    client.destroy();
  });

  it('should be valid', async () => {
    expect(client.prefix).toBe(DISCORD_PREFIX);
    expect(client.token).toBe(DISCORD_TOKEN);
  });

  it('should return false but return true', () => {
    expect(false).toBe(true);
  });
});

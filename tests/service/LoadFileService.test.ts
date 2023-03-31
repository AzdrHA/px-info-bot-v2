import { DISCORD_PREFIX, DISCORD_TOKEN } from '@config/AppConfig';
import LoadFileService from '@service/LoadFileService';
import Client from '@/Client';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

describe('LoadFileService', () => {
  let client: Client;
  let loadFileService: LoadFileService;

  beforeAll(() => {
    client = new Client({
      prefix: DISCORD_PREFIX,
      token: DISCORD_TOKEN,
      intents: [],
      partials: [],
      autoStart: false
    });
    loadFileService = new LoadFileService(client);
  });

  afterAll(() => {
    client.destroy();
  });

  it('should throw an error if the file name and its class name are not identical', async () => {
    const filePath = 'path/to/event.ts';
    const eventMock = vi.fn(() => ({ constructor: { name: 'DifferentName' } }));
    vi.doMock(filePath, () => ({ default: eventMock, name: 'event' }));

    await expect(loadFileService.loadFile(filePath)).rejects.toThrow(
      'The file event and its class name are not identical'
    );
  });
});

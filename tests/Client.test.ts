import Client from '../src/Client'
import { DISCORD_PREFIX, DISCORD_TOKEN } from '../src/config/AppConfig'

describe('Client', () => {
  let client: Client

  beforeEach(() => {
    client = new Client({
      prefix: DISCORD_PREFIX,
      token: DISCORD_TOKEN,
      intents: [],
      partials: [],
      autoStart: false
    })
  })

  it('should be valid', async () => {
    expect(client.prefix).toBe(DISCORD_PREFIX)
    expect(client.token).toBe(DISCORD_TOKEN)
  })
})

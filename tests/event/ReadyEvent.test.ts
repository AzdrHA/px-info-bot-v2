import Client from '@/Client'
import { DISCORD_PREFIX, DISCORD_TOKEN } from '@config/AppConfig'
import ReadyEvent from '@event/ReadyEvent'
import { describe, it, expect, vi, beforeAll } from 'vitest'

describe('ReadyEvent', () => {
  let client: Client

  beforeAll(() => {
    client = new Client({
      prefix: DISCORD_PREFIX,
      token: DISCORD_TOKEN,
      intents: [],
      partials: [],
      autoStart: false
    })
  })

  it('should be emitted when the client is ready', async () => {
    await client.login(DISCORD_TOKEN)
    const readyEvent = new ReadyEvent(client)
    console.log = vi.fn()
    await readyEvent.run()
    expect(console.log).toHaveBeenCalledWith(
      'Logged in as', client.user?.tag
    )
    client.destroy()
  })
})

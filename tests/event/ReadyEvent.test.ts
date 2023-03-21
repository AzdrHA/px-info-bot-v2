import Client from '@/Client'
import { DISCORD_PREFIX, DISCORD_TOKEN } from '@config/AppConfig'
import ReadyEvent from '@event/ReadyEvent'

describe('ReadyEvent', () => {
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

  it('should be emitted when the client is ready', async () => {
    await client.login(DISCORD_TOKEN)
    const readyEvent = new ReadyEvent(client)
    console.log = jest.fn()
    readyEvent.run()
    expect(console.log).toHaveBeenCalledWith(
      'Logged in as', client.user?.tag
    )
    client.destroy()
  })
})

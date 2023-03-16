import Client from '../src/Client'
import { Client as BaseClient } from 'discord.js'

describe('Client', () => {
  it('should be valid', () => {
    const client = new Client({
      intents: [],
      partials: [],
      token: 'token123',
      prefix: '123prefix'
    })
    expect(client).toBeInstanceOf(BaseClient)
    expect(client.prefix).toBe('123prefix')
    expect(client.token).toBe('token123')
  })
})

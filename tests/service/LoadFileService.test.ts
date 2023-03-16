import LoadFileService from '../../src/service/LoadFileService'
import Client from '../../src/Client'
import { DISCORD_PREFIX, DISCORD_TOKEN } from '../../src/config/AppConfig'

describe('LoadFileService', () => {
  let client: Client
  let loadFileService: LoadFileService

  beforeEach(() => {
    client = new Client({
      prefix: DISCORD_PREFIX,
      token: DISCORD_TOKEN,
      intents: [],
      partials: [],
      autoStart: false
    })
    loadFileService = new LoadFileService(client)
  })

  describe('loadFile', () => {
    it('should not load a non-script file', async () => {
      const filePath = 'path/to/file.txt'
      expect(await loadFileService.loadFile(filePath)).toBeFalsy()
    })
  })

  // it('should throw an error if the file name and its class name are not identical', async () => {
  //   const filePath = 'path/to/event.ts'
  //   const eventMock = jest.fn(() => ({ constructor: { name: 'DifferentName' } }))
  //   jest.doMock(filePath, () => ({ default: eventMock, name: 'event' }))
  //
  //   await expect(loadFileService.loadFile(filePath)).rejects.toThrow('The file event and its class name are not identical')
  // })
})

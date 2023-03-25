import { MakeRequest } from './MakeRequest'
import * as util from 'util'
import { CACHE } from '@config/Constant'
import UtilLogger from '@util/UtilLogger'

/**
 * Default API request
 * @template K
 */
export default class DefaultApiRequest <K> {
  private readonly url: string

  /**
   * Default API request
   * @param {string} url
   * @constructor
   */
  public constructor (url: string) {
    this.url = url
  }

  /**
   * Get data from the API
   * @returns {Promise<K>}
   * @example
   * const data = await DefaultApiRequest.get('/users')
   */
  public async get (): Promise<K> {
    if (CACHE.has(this.url)) {
      UtilLogger.cacheRequest(util.format('Cache hit for %s', this.url))
      return CACHE.get(this.url)
    }
    UtilLogger.apiRequest(util.format('Requesting GET %s', this.url))
    const request = await MakeRequest(this.url, 'GET')
    CACHE.set(this.url, request)
    return request
  }

  /**
   * Create data in the API
   * @param {K} id
   * @param {Record<string, string>} data
   * @returns {Promise<K>}
   * @template K
   * @example
   * const data = await DefaultApiRequest().update('id', 'value')
   */
  public async update (id: keyof K, data?: string | null): Promise<K> {
    CACHE.delete(this.url)
    UtilLogger.apiRequest(util.format('Requesting PUT %s', this.url))
    return await MakeRequest(util.format('%s/%s', this.url, id), 'PUT', { [id]: data })
  }
}

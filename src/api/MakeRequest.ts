import axios, { type Method } from 'axios'
import { API_KEY, API_URL } from '../config/AppConfig'

/**
 * Make a request to the API
 * @param {string} url
 * @param {Method} method
 * @param {Record<string, unknown>} data
 * @returns {Promise<any>}
 * @constructor
 * @example
 * const data = await MakeRequest('/users', 'GET')
 */
export const MakeRequest = async (url: string, method: Method, data: Record<string, unknown> = {}): Promise<any> => {
  data.apiKey = API_KEY
  return await new Promise((resolve, reject) => {
    axios({
      baseURL: API_URL,
      url,
      method,
      data
    })
      .then((r) => { resolve(r.data) })
      .catch((e) => { reject(e) })
  })
}

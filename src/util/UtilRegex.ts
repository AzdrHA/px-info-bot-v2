/**
 * @param {string} mention
 * @returns {string}
 */
export const getIdFromMention = (mention: string): string => {
  return mention.replace(/[<@!>]/g, '')
}

/**
 * @param {string} mention
 * @returns {string}
 */
export const getIdFromChannelMention = (mention: string): string => {
  return mention.replace(/[<#>]/g, '')
}

/**
 * @param {string} mention
 * @returns {string}
 */
export const getIdFromRoleMention = (mention: string): string => {
  return mention.replace(/[<@&>]/g, '')
}

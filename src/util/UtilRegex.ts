/**
 * @param {string} mention
 * @returns {string}
 */
export const getIdFromMention = (mention: string): string => {
  return mention.replace(/[<@!>]/g, '');
};

/**
 * @param {string} mention
 * @returns {string}
 */
export const getIdFromChannelMention = (mention: string): string => {
  return mention.replace(/[<#>]/g, '');
};

/**
 * @param {string} mention
 * @returns {string}
 */
export const getIdFromRoleMention = (mention: string): string => {
  return mention.replace(/[<@&>]/g, '');
};

/**
 * @param {string} name
 * @returns {boolean}
 */
export const isBadName = (name: string): boolean => {
  return /^[^0a-zA-Z]/i.test(name);
};

/**
 * @param {string} version
 * @returns {boolean}
 * @constructor
 * @description Check if the version is a valid
 */
export const isVersionPattern = (version: string): boolean => {
  return /^v\.\d+\.\d+\.\d+$/i.test(version);
}
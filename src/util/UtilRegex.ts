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

/**
 * @param {string} date
 * @returns {boolean}
 * @constructor
 * @description Check if the date is a valid
 * @example 01-Jan-2021
 */
export const isDatePattern = (date: string): boolean => {
  return /^(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/i.test(date);
}
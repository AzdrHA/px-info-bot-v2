import { describe, it, expect } from 'vitest';
import {
  getIdFromChannelMention,
  getIdFromMention,
  getIdFromRoleMention,
  isBadName
} from '@util/UtilRegex';

describe('UtilRegex', () => {
  it('should get the user id from mention', () => {
    const user = '123456789012345678';
    const userMention = `<@${user}>`;
    expect(getIdFromMention(userMention)).toBe(user);
    expect(getIdFromMention(user)).toBe(user);
  });

  it('should get the channel id from mention', () => {
    const channel = '123456789012345678';
    const channelMention = `<#${channel}>`;
    expect(getIdFromChannelMention(channelMention)).toBe(channel);
    expect(getIdFromChannelMention(channel)).toBe(channel);
  });

  it('should get the role id from mention', () => {
    const role = '123456789012345678';
    const roleMention = `<@&${role}>`;
    expect(getIdFromRoleMention(roleMention)).toBe(role);
    expect(getIdFromRoleMention(role)).toBe(role);
  });

  describe('isBadName', () => {
    it('should return true if the name starts with not a valid character', () => {
      expect(isBadName('1998')).toBeTruthy();
      expect(isBadName('1Sy_')).toBeTruthy();
      expect(isBadName('[23]Sigmet')).toBeTruthy();
    });

    it('should return false if the name starts with a valid character', () => {
      expect(isBadName('jean')).toBeFalsy();
      expect(isBadName('Zerø')).toBeFalsy();
      expect(isBadName('A-Lister')).toBeFalsy();
    });
  });
});

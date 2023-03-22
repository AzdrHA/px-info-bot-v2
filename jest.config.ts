import type { Config } from 'jest'
import test from 'jest-module-name-mapper'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  notify: false,
  moduleNameMapper: test('./tsconfig.json'),
  silent: true
}
export default config

import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    watch: false
  },
  resolve: {
    alias: {
      '@': './src',
      '@abstract': './src/abstract',
      '@collector': './src/collector',
      '@command': './src/command',
      '@component': './src/component',
      '@config': './src/config',
      '@enum': './src/enum',
      '@event': './src/event',
      '@exception': './src/exception',
      '@interaction': './src/interaction',
      '@interface': './src/interface',
      '@service': './src/service',
      '@util': './src/util'
    }
  }
});

import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    endOfLine: 'lf',
    semi: true,
    singleQuote: true,
  },
  staged: {
    '*': 'vp check --fix',
  },
});

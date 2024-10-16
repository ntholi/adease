import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import preserveDirectives from 'rollup-preserve-directives';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      rollupTypes: true,
      entryRoot: 'src',
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'adease',
      fileName: 'adease',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      plugins: [preserveDirectives()],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
      },
    },
  },
});

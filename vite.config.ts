I apologize for the error. It seems I made a mistake in the tool call for the previous turn.

Let me correct that and apply the changes to `vite.config.ts`. I will add `./components/PeopleAndCulture.tsx` to the `optimizeDeps.include` array.
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['./components/PeopleAndCulture.tsx'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'recharts', 'lucide-react'],
        },
      },
    },
  },
});
```
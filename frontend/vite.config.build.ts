// vite.config.build.js

export default {
  build: {
    rollupOptions: {
      // Disable type checking for this build
      input: ['src/main.js'],
    },
  },
};

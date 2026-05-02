export default {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      colors: {
        void: '#03070d',
        navy: '#071424',
        ink: '#0b1018',
        panel: '#0e1824',
        line: 'rgba(142, 196, 255, 0.16)',
        signal: '#7cc7ff',
        cyan: '#1fd4ff',
        platinum: '#d7e7f7',
        muted: '#7d8da3'
      },
      boxShadow: {
        glow: '0 0 36px rgba(31, 212, 255, 0.18)'
      }
    }
  }
}

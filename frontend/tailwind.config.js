export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'flow': {
          '0%': { 
            transform: 'translateX(0) scale(1)',
            opacity: '0'
          },
          '50%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(-100px) scale(1.2)',
            opacity: '0'
          }
        },
      },
      animation: {
        'slide-in': 'slide-in 1s ease-out',
        'flow-1': 'flow 2s ease-in-out infinite',
        'flow-2': 'flow 2s ease-in-out infinite 0.3s',
        'flow-3': 'flow 2s ease-in-out infinite 0.6s'
      }
    },
  },
  plugins: [],
};
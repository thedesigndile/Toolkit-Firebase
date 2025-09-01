// @ts-nocheck
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--text-primary))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          start: "hsl(var(--secondary-start))",
          end: "hsl(var(--secondary-end))",
        },
        surface: "hsl(var(--surface))",
        'text-primary': "hsl(var(--text-primary))",
        'text-secondary': "hsl(var(--text-secondary))",
      },
      boxShadow: {
        'depth-1': 'var(--depth-1)',
        'depth-2': 'var(--depth-2)',
        'depth-3': 'var(--depth-3)',
        'depth-glow': 'var(--depth-glow)',
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Inter var', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        'spring': 'var(--spring-curve)',
      },
      animation: {
        'breathe': 'breathe 2s ease-in-out infinite',
      },
      keyframes: {
        'breathe': {
          '0%, 100%': { opacity: '0', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.005)' },
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;

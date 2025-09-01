// @ts-nocheck


import type {Config} from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '3xl': '1.5rem',
        '2xl': '1.25rem',
        xl: '1rem', // 16px
        lg: '0.75rem', // 12px
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        body: ['var(--font-body)', ...fontFamily.sans],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: '#667EEA',
          dark: '#764BA2',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          light: '#F093FB',
          dark: '#F5576C',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        'brand-blue': 'hsl(var(--brand-blue-raw))',
        'brand-purple': 'hsl(var(--brand-purple-raw))',
        'brand-pink': 'hsl(var(--brand-pink-raw))',
        'soft-gray': 'hsl(var(--soft-gray))',
        // Advanced Design System Colors
        glass: 'rgba(255, 255, 255, 0.1)',
        neumorphic: {
          shadow: '#E0E5EC',
          highlight: '#FFFFFF',
        },
      },

      backdropBlur: {
        xs: '2px',
      },

      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        // Advanced Animations
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: 0 },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        'glow': {
          from: { boxShadow: '0 0 5px #00D4FF' },
          to: { boxShadow: '0 0 20px #00D4FF, 0 0 30px #00D4FF' }
        },
        'morph': {
          '0%': { borderRadius: '0%' },
          '50%': { borderRadius: '50%' },
          '100%': { borderRadius: '0%' }
        },
        'float-particle-1': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: 0.3 },
          '25%': { transform: 'translateY(-20px) translateX(10px) rotate(90deg)', opacity: 0.6 },
          '50%': { transform: 'translateY(-10px) translateX(-5px) rotate(180deg)', opacity: 0.4 },
          '75%': { transform: 'translateY(-25px) translateX(15px) rotate(270deg)', opacity: 0.7 }
        },
        'float-particle-2': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: 0.2 },
          '20%': { transform: 'translateY(-15px) translateX(-10px) rotate(120deg)', opacity: 0.5 },
          '40%': { transform: 'translateY(-5px) translateX(20px) rotate(240deg)', opacity: 0.3 },
          '60%': { transform: 'translateY(-30px) translateX(-15px) rotate(360deg)', opacity: 0.6 },
          '80%': { transform: 'translateY(-10px) translateX(25px) rotate(480deg)', opacity: 0.4 }
        },
        'float-particle-3': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: 0.25 },
          '30%': { transform: 'translateY(-25px) translateX(5px) rotate(60deg)', opacity: 0.5 },
          '60%': { transform: 'translateY(-15px) translateX(-20px) rotate(180deg)', opacity: 0.35 },
          '90%': { transform: 'translateY(-20px) translateX(30px) rotate(300deg)', opacity: 0.6 }
        },
        'pulse-bg': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.02)' }
        },
        'rotate-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        'slideInFromLeft': {
          '0%': { opacity: 0, transform: 'translateX(-50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        },
        'slideInFromRight': {
          '0%': { opacity: 0, transform: 'translateX(50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        },
        'slideInFromBottom': {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'fadeInUp': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'scaleIn': {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        'rotateIn': {
          '0%': { opacity: 0, transform: 'rotate(-10deg) scale(0.8)' },
          '100%': { opacity: 1, transform: 'rotate(0deg) scale(1)' }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'morph': 'morph 0.8s ease-in-out',
        'float-particle-1': 'float-particle-1 15s ease-in-out infinite',
        'float-particle-2': 'float-particle-2 22s ease-in-out infinite reverse',
        'float-particle-3': 'float-particle-3 25s ease-in-out infinite',
        'pulse-bg': 'pulse-bg 8s ease-in-out infinite',
        'rotate-gradient': 'rotate-gradient 10s ease infinite',
        'slideInFromLeft': 'slideInFromLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slideInFromRight': 'slideInFromRight 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slideInFromBottom': 'slideInFromBottom 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fadeInUp': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scaleIn': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'rotateIn': 'rotateIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function({ addUtilities, theme }: { addUtilities: any, theme: any }) {
      const newUtilities = {
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
} satisfies Config;

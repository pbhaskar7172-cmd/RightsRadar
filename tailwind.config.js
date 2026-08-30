/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          50: '#EEF6FF',
          100: '#D9ECFF',
          200: '#BCDDFE',
          300: '#8DC7FD',
          400: '#56A8FB',
          500: '#2B85F6',
          600: '#1765EB',
          700: '#114ECD',
          800: '#1340A5',
          900: '#153982',
          950: '#0E2452',
        },
        indigo: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        navy: {
          800: '#111B2E',
          850: '#0C1527',
          900: '#080E1C',
          950: '#04070F',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          muted: '#F1F5F9',
          glass: 'rgba(255, 255, 255, 0.85)',
          'glass-dark': 'rgba(15, 23, 42, 0.75)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px -4px rgba(43, 133, 246, 0.45)',
        'glow-indigo': '0 0 30px -4px rgba(99, 102, 241, 0.45)',
        'glow-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.45)',
        'glow-amber': '0 0 25px -4px rgba(245, 158, 11, 0.45)',
        'glow-rose': '0 0 25px -4px rgba(244, 63, 94, 0.45)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.2)',
      },
      animation: {
        'radar-sweep': 'sweep 4s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}

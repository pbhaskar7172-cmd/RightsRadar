/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          blue: '#C7D7FE',
          'blue-light': '#EEF2FF',
          yellow: '#F3E68E',
          'yellow-light': '#FEF9C3',
          purple: '#CBB8E2',
          'purple-light': '#F5F3FF',
          coral: '#FF9D7E',
          'coral-light': '#FFF1EC',
          mint: '#A7F3D0',
          'mint-light': '#ECFDF5',
          pink: '#FBCFE8',
          'pink-light': '#FDF2F8',
          slate: '#E2E8F0',
        },
        ink: {
          900: '#0B0F19',
          800: '#111827',
          700: '#1E293B',
          600: '#334155',
          500: '#475569',
        },
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
        surface: {
          canvas: '#F8F9FB',
          card: '#FFFFFF',
          muted: '#F1F3F7',
          pill: '#E9ECF2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(15, 23, 42, 0.04), 0 1px 4px -1px rgba(15, 23, 42, 0.02)',
        'card': '0 12px 32px -8px rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        'elevated': '0 20px 48px -12px rgba(15, 23, 42, 0.08), 0 8px 24px -4px rgba(15, 23, 42, 0.04)',
        'pill': '0 2px 6px rgba(0, 0, 0, 0.06)',
        'black': '0 8px 24px -4px rgba(15, 23, 42, 0.25)',
      },
      animation: {
        'radar-sweep': 'sweep 4s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}


import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

/* eslint-disable @typescript-eslint/no-explicit-any */

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

/**
 * Design tokens for the "aurora glass" look:
 * - deep near-black canvas with soft blue/cyan light
 * - translucent glass surfaces with a hairline border
 * - vivid blue -> cyan gradient accents
 */
const theme = extendTheme({
  config,
  fonts: {
    heading: '"Outfit", "Inter", system-ui, -apple-system, sans-serif',
    body: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  fontSizes: {
    '2xs': '0.6875rem',
  },
  colors: {
    brand: {
      50: '#e0f2fe',
      100: '#bae6fd',
      200: '#7dd3fc',
      300: '#38bdf8',
      400: '#0ea5e9',
      500: '#0284c7', // Primary Brand Color
      600: '#0369a1',
      700: '#075985',
      800: '#0c4a6e',
      900: '#082f49',
    },
    accent: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    dark: {
      bg: '#070a12',
      card: '#0d1120',
      border: '#2a2a32',
      text: '#efeff1',
      muted: '#a1a1aa',
    },
    light: {
      bg: '#f7f9fd',
      card: '#ffffff',
      border: '#e4e4e7',
      text: '#18181b',
      muted: '#71717a',
    },
  },
  semanticTokens: {
    colors: {
      'app.bg': { default: 'light.bg', _dark: '#070a12' },
      'app.surface': { default: 'rgba(255, 255, 255, 0.72)', _dark: 'rgba(255, 255, 255, 0.035)' },
      'app.surfaceSolid': { default: 'white', _dark: '#0d1120' },
      'app.border': { default: 'rgba(15, 23, 42, 0.08)', _dark: 'rgba(255, 255, 255, 0.09)' },
      'app.borderStrong': { default: 'rgba(15, 23, 42, 0.14)', _dark: 'rgba(255, 255, 255, 0.16)' },
      'app.text': { default: '#0f172a', _dark: '#eef2f8' },
      'app.muted': { default: '#5b6472', _dark: '#94a3b8' },
      'app.brandSoft': { default: 'rgba(2, 132, 199, 0.08)', _dark: 'rgba(56, 189, 248, 0.10)' },
    },
  },
  shadows: {
    soft: '0 12px 30px -18px rgba(2, 132, 199, 0.55)',
    glow: '0 0 0 1px rgba(56, 189, 248, 0.30), 0 18px 50px -20px rgba(2, 132, 199, 0.65)',
    'glow-sm': '0 0 0 1px rgba(56, 189, 248, 0.22), 0 10px 30px -16px rgba(2, 132, 199, 0.55)',
  },
  radii: {
    '4xl': '2rem',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'full',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        _focusVisible: {
          boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.45)',
          outline: 'none',
        },
      },
      variants: {
        solid: {
          bgGradient: 'linear(to-r, brand.500, accent.500)',
          color: 'white',
          boxShadow: 'soft',
          _hover: {
            bgGradient: 'linear(to-r, brand.400, accent.400)',
            transform: 'translateY(-2px)',
            boxShadow: 'glow',
            _disabled: { background: 'gray.600', boxShadow: 'none', transform: 'none' },
          },
          _active: { transform: 'translateY(0)' },
        },
        outline: {
          borderColor: 'app.borderStrong',
          color: 'app.text',
          bg: 'transparent',
          _hover: {
            borderColor: 'brand.400',
            bg: 'app.brandSoft',
            transform: 'translateY(-2px)',
          },
        },
        glass: (props: any) => ({
          bg: mode('whiteAlpha.700', 'whiteAlpha.100')(props),
          backdropFilter: 'blur(12px)',
          border: '1px solid',
          borderColor: 'app.border',
          color: 'app.text',
          _hover: {
            bg: mode('whiteAlpha.900', 'whiteAlpha.200')(props),
            borderColor: 'brand.400',
          },
        }),
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 'wider',
      },
    },
    Heading: {
      baseStyle: {
        letterSpacing: '-0.03em',
      },
    },
    Link: {
      baseStyle: {
        _focusVisible: {
          boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.45)',
          outline: 'none',
          borderRadius: 'sm',
        },
      },
    },
    Tooltip: {
      baseStyle: {
        borderRadius: 'lg',
        fontWeight: '600',
      },
    },
  },
  styles: {
    global: (props: any) => ({
      html: {
        scrollBehavior: 'smooth',
        scrollPaddingTop: '6rem',
      },
      body: {
        bg: mode(
          'radial-gradient(60% 45% at 15% 0%, rgba(2, 132, 199, 0.10), transparent 60%), radial-gradient(55% 40% at 85% 5%, rgba(8, 145, 178, 0.10), transparent 60%), radial-gradient(50% 50% at 50% 100%, rgba(2, 132, 199, 0.06), transparent 70%), #f7f9fd',
          'radial-gradient(60% 45% at 15% 0%, rgba(2, 132, 199, 0.22), transparent 60%), radial-gradient(55% 40% at 85% 5%, rgba(8, 145, 178, 0.16), transparent 60%), radial-gradient(60% 60% at 50% 110%, rgba(2, 132, 199, 0.14), transparent 70%), #070a12'
        )(props),
        bgAttachment: 'fixed',
        color: mode('light.text', 'dark.text')(props),
        fontFeatureSettings: '"cv11", "ss01"',
        transition: 'background-color 0.4s ease, color 0.4s ease',
        overflowX: 'hidden',
        minHeight: '100vh',
      },
      '::selection': {
        background: 'rgba(56, 189, 248, 0.30)',
        color: mode('#0f172a', '#eef2f8')(props),
      },
      '::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        background: mode('rgba(15, 23, 42, 0.20)', 'rgba(148, 163, 184, 0.35)')(props),
        borderRadius: 'full',
        border: '2px solid transparent',
        backgroundClip: 'content-box',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: mode('rgba(15, 23, 42, 0.35)', 'rgba(148, 163, 184, 0.55)')(props),
        backgroundClip: 'content-box',
      },
    }),
  },
});

export default theme;

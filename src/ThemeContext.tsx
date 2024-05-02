import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type ThemeMode = 'auto' | 'light' | 'dark'
type ColorSet = {
  background?: string
  text?: string
  shadow?: string
  primaryActionBackground?: string
  primaryActionHoverBackground?: string
  primaryActionText?: string
  secondaryActionBackground?: string
  secondaryActionText?: string
  secondaryActionHoverBackground?: string
}
type Theme = {
  mode: ThemeMode
  light: ColorSet
  dark: ColorSet
}

const defaultTheme = {
  mode: 'auto',
  light: {
    background: '#fff',
    text: '#000',
    shadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    primaryActionBackground: '#38bdf8',
    primaryActionHoverBackground: '#38bdf8',
    primaryActionText: '#fff',
    secondaryActionBackground: '#ffffff',
    secondaryActionText: '#000000',
    secondaryActionHoverBackground: '#f0f0f0'
  },
  dark: {
    background: '#262626',
    text: '#ffffff',
    shadow: '0 0 10px rgba(255, 255, 255, 0.1)',
    primaryActionBackground: '#38bdf8',
    primaryActionHoverBackground: '#38bdf8',
    primaryActionText: '#ffffff',
    secondaryActionBackground: '#2c2c2c',
    secondaryActionText: '#ffffff',
    secondaryActionHoverBackground: '#333333'
  }
} as Theme
const ThemeContext = createContext(defaultTheme)

const ThemeProvider = ({ theme: providedTheme, children }: { theme?: Theme; children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>({
    mode: providedTheme?.mode ?? 'auto',
    light: { ...defaultTheme.light, ...providedTheme?.light },
    dark: { ...defaultTheme.dark, ...providedTheme?.dark }
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined' || theme.mode !== 'auto') return

    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    themeQuery.addEventListener('change', (e) => {
      setTheme({ ...theme, mode: e.matches ? 'dark' : 'light' })
    })

    return () => {
      themeQuery.removeEventListener('change', (e) => {
        setTheme({ ...theme, mode: e.matches ? 'dark' : 'light' })
      })
    }
  }, [setTheme])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

const useTheme = () => useContext(ThemeContext)

export default ThemeProvider
export { Theme, useTheme }

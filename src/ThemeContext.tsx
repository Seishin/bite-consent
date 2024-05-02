import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type ThemeMode = 'auto' | 'light' | 'dark'

type ThemeContextData = {
  mode: ThemeMode
}

const ThemeContext = createContext({} as ThemeContextData)

const ThemeProvider = ({ mode: presetMode, children }: { mode: ThemeMode; children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(presetMode ?? 'auto')

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined' || mode !== 'auto') return

    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    themeQuery.addEventListener('change', (e) => {
      setMode(e.matches ? 'dark' : 'light')
    })

    return () => {
      themeQuery.removeEventListener('change', (e) => {
        setMode(e.matches ? 'dark' : 'light')
      })
    }
  }, [setMode])

  return <ThemeContext.Provider value={{ mode }}>{children}</ThemeContext.Provider>
}

const useTheme = () => useContext(ThemeContext)

export default ThemeProvider
export { ThemeMode as Theme, useTheme }

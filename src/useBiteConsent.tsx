import React, { useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { BiteConsent, CONSENT_COOKIE_NAME } from './BiteConsent'
import CookieConfig from './CookieConfig'
import Position, { CustomPosition } from './Position'
import ThemeProvider, { Theme } from './ThemeContext'

const BITE_CONSENT_VIEW_ELEMENT_ID = 'bite-consent-view'

type BiteConsentResult = {
  consentCookie: string | undefined
  show: () => void
  revoke: () => void
}

type BiteConsentOptions = {
  privacyPolicyUrl: string
  text?: string
  visibility?: 'auto' | 'visible' | 'hidden'
  position?: Position | CustomPosition
  cookieConfig?: CookieConfig
  themeMode?: Theme
  onAccept?: () => void
}

const useBiteConsent = (options: BiteConsentOptions) => {
  const { privacyPolicyUrl, text, visibility, position, cookieConfig, themeMode, onAccept } = options

  const consentCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith(cookieConfig?.name ?? CONSENT_COOKIE_NAME))

  const show = useCallback(async () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const link = document.createElement('link')
    link.id = 'insighttap-fonts'
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap'
    link.rel = 'stylesheet'
    if (!document.getElementById('insighttap-fonts')) {
      document.head.appendChild(link)
    }

    const root = document.createElement('div')
    root.id = BITE_CONSENT_VIEW_ELEMENT_ID
    root.style.fontFamily = 'Roboto'

    const shadowRoot = root.attachShadow({ mode: 'open' })

    createRoot(shadowRoot).render(
      <ThemeProvider mode={themeMode ?? 'auto'}>
        <BiteConsent
          privacyPolicyUrl={privacyPolicyUrl}
          text={text}
          visibility={visibility}
          position={position}
          cookieConfig={cookieConfig}
          onAccept={onAccept}
        />
      </ThemeProvider>
    )

    if (!document.getElementById(BITE_CONSENT_VIEW_ELEMENT_ID)) {
      document.body.appendChild(root)
    }
  }, [])

  const revoke = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const cookieName = cookieConfig?.name ?? 'cookie_consent'
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }, [])

  return { consentCookie, show, revoke } as BiteConsentResult
}

export default useBiteConsent

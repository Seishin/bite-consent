import React, { useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { BiteConsent, CONSENT_COOKIE_NAME } from './BiteConsent'
import CookieConfig from './CookieConfig'
import Position, { CustomPosition } from './Position'

type BiteConsentResult = {
  consentCookie: string | undefined
  show: () => void
  revoke: () => void
}

const useBiteConsent = (
  privacyPolicyUrl: string,
  text?: string | undefined,
  visibility?: 'auto' | 'visible' | 'hidden',
  position?: Position | CustomPosition,
  cookieConfig?: CookieConfig,
  onAccept?: () => void
) => {
  const consentCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith(cookieConfig?.name ?? CONSENT_COOKIE_NAME))

  const show = useCallback(async () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    if (document.getElementById('bite-consent-view')) {
      return
    }

    const fontFace = new FontFace(
      'Roboto',
      'url(https://themes.googleusercontent.com/static/fonts/roboto/v9/Pru33qjShpZSmG3z6VYwnT8E0i7KZn-EPnyo3HZu7kw.woff)'
    )
    fontFace.style = 'normal'
    await fontFace.load()

    document.fonts.add(fontFace)

    const root = document.createElement('div')
    root.id = 'bite-consent-view'

    const shadowRoot = root.attachShadow({ mode: 'open' })

    createRoot(shadowRoot).render(
      <BiteConsent
        privacyPolicyUrl={privacyPolicyUrl}
        text={text}
        visibility={visibility}
        position={position}
        cookieConfig={cookieConfig}
        onAccept={onAccept}
      />
    )

    document.body.appendChild(root)
  }, [])

  const revoke = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const cookieName = cookieConfig?.name ?? 'cookie_consent'
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }, [])

  return { consentCookie, show, revoke } as BiteConsentResult
}

export default useBiteConsent

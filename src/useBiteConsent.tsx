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

  const show = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    if (document.getElementById('bite-consent-view')) {
      return
    }

    const root = document.createElement('div')
    root.id = 'bite-consent-view'

    document.body.appendChild(root)

    createRoot(root).render(
      <BiteConsent
        privacyPolicyUrl={privacyPolicyUrl}
        text={text}
        visibility={visibility}
        position={position}
        cookieConfig={cookieConfig}
        onAccept={onAccept}
      />
    )
  }, [])

  const revoke = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const cookieName = cookieConfig?.name ?? 'cookie_consent'
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }, [])

  return { consentCookie, show, revoke } as BiteConsentResult
}

export default useBiteConsent
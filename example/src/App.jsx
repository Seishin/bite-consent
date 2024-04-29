import { useBiteConsent } from 'bite-consent'
import React, { useEffect } from 'react'

function App() {
  const { consentCookie, show, revoke } = useBiteConsent('https://example.com/privacy')

  useEffect(() => {
    show()
  }, [show])

  return (
    <div
      className="App"
      style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <h2>Cookie Consent</h2>
      <p>{consentCookie ?? 'undefined'}</p>

      <button onClick={() => revoke()}>Revoke Consent</button>
    </div>
  )
}

export default App

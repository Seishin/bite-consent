import { BiteConsent } from 'bite-consent'
import React from 'react'

function App() {
  return (
    <div className="App">
      <BiteConsent privacyPolicyUrl="https://example.com/privacy-policy" onAccept={() => {}} />
    </div>
  )
}

export default App

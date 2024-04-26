import { BiteConsent } from 'bite-consent'
import React from 'react'

function App() {
  return (
    <div className="App">
      <BiteConsent
        text="We use cookies for essential website functions and to better understand how you use our site, so we can create the best possible experience for you ❤️"
        primaryAction="Got it"
        onPrimaryActionTap={() => {
          alert('Thanks for your consent! 🍪')
        }}
        secondaryAction="Privacy Policy"
        onSecondaryActionTap={() => {
          alert('Privacy Policy')
        }}
      />
    </div>
  )
}

export default App

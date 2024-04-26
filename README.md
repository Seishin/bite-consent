# Bite Consent

Bite Consent is a lightweight React library for managing cookie consent banners with customizable descriptions and actions. It provides an easy way to implement cookie consent functionality in your React applications while ensuring compliance with privacy regulations.

## Features

- Simple integration with React applications
- Customizable cookie consent banner with description and actions
- Built-in actions for "Got it" and opening the privacy policy
- Lightweight and easy to use

## Installation

You can install Bite Consent via npm or yarn:

```bash
npm install bite-consent
```

or

```bash
yarn add bite-consent
```

## Usage

To use Bite Consent in your React application, simply import the CookieConsent component and include it in your component tree:

```js
import React from 'react'
import { BiteConsent } from 'bite-consent'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Website</h1>
      </header>
      <main>
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
      </main>
    </div>
  )
}

export default App
```

## License

Bite Consent is released under the MIT License.

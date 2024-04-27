# Bite Consent

Bite Consent is a lightweight React library for managing cookie consent banners with customizable descriptions and actions. It provides an easy way to implement cookie consent functionality in your React applications while ensuring compliance with privacy regulations.

![Screenshot 2024-04-27 at 9 55 22](https://github.com/Seishin/bite-consent/assets/324076/cda2ad05-f5ad-41c5-b4d2-9d0e1459e1e8)

## Features

- Simple integration with React applications
- Customizable cookie consent banner with description and actions
- Built-in actions for "Got it" and opening the privacy policy
- Lightweight and easy to use

## Installation

You can install Bite Consent via npm or yarn:

```bash
npm install bite-consent framer-motion
```

or

```bash
yarn add bite-consent framer-motion
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
        <BiteConsent privacyPolicyUrl="https://example.com/privacy-policy" />
      </main>
    </div>
  )
}

export default App
```

## License

Bite Consent is released under the MIT License.

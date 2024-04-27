# Bite Consent

Bite Consent is a lightweight React library for managing cookie consent banners with customizable descriptions and actions. It provides an easy way to implement cookie consent functionality in your React applications while ensuring compliance with privacy regulations.

![Screenshot 2024-04-27 at 18 43 55](https://github.com/Seishin/bite-consent/assets/324076/a4df7470-86b4-49a8-89be-73549c410695)

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

## Props

| Name               | Type                            | Default                                                                                                                                                              | Description                                                                                                                                                                 |
| ------------------ | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `privacyPolicyUrl` | `string`                        | `undefined`                                                                                                                                                          | The URL to your privacy policy. Required.                                                                                                                                   |
| `text`             | `string`                        | `Hey there! We use cookies to keep things running smoothly on our website and to get to know you better. It helps us make your time here as awesome as possible! ❤️` | Custom text to display in the consent banner.                                                                                                                               |
| `visibility`       | `auto` \| `visible` \| `hidden` | `auto`                                                                                                                                                               | Specifies the visibility of the consent banner. `auto` displays the view based on the availability of the consent cookie, whereas `visible` displays and `hidden` hides it. |
| `position`         | `Position` \| `CustomPosition`  | `bottom-left`                                                                                                                                                        | Sets the position of the consent view on the page.                                                                                                                          |
| `onAccept`         | `function`                      | `() => void`                                                                                                                                                         | A function to be called when the user accepts the cookie policy.                                                                                                            |

## License

Bite Consent is released under the MIT License.

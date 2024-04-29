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
npm install bite-consent
```

or

```bash
yarn add bite-consent
```

## Usage

To use Bite Consent in your React application, you can now also use the `useBiteConsent` hook:

```js
import React from 'react'
import { useBiteConsent } from 'bite-consent'

function App() {
  const { consentCookie, show, revoke } = useBiteConsent('https://example.com/privacy-policy')

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Website</h1>
      </header>
      <main>{/* Your component content */}</main>
      {consentCookie ? null : <button onClick={show}>Show Consent Banner</button>}
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
| `position`         | `Position` \| `CustomPosition`  | `bottom-left`                                                                                                                                                        | Sets the position of the consent view on the page. See below for details.                                                                                                   |
| `cookieConfig`     | `CookieConfig`                  | -                                                                                                                                                                    | Configuration options for consent cookies. See below for details.                                                                                                           |
| `onAccept`         | `function`                      | `() => void`                                                                                                                                                         | A function to be called when the user accepts the cookie policy.                                                                                                            |

### Position

| Type           | Description                                       |
| -------------- | ------------------------------------------------- |
| `top-left`     | Positions the element at the top left corner.     |
| `top-right`    | Positions the element at the top right corner.    |
| `bottom-left`  | Positions the element at the bottom left corner.  |
| `bottom-right` | Positions the element at the bottom right corner. |

### CustomPosition

| Property | Type                 | Description                                                                  |
| -------- | -------------------- | ---------------------------------------------------------------------------- |
| `top`    | `number` \| `string` | The distance from the top of the container. Accepts number or CSS string.    |
| `left`   | `number` \| `string` | The distance from the left of the container. Accepts number or CSS string.   |
| `right`  | `number` \| `string` | The distance from the right of the container. Accepts number or CSS string.  |
| `bottom` | `number` \| `string` | The distance from the bottom of the container. Accepts number or CSS string. |

### CookieConfig

| Property   | Type                        | Description                                                          |
| ---------- | --------------------------- | -------------------------------------------------------------------- |
| `name`     | `string`                    | The name or identifier of the consent cookie.                        |
| `maxAge`   | `number`                    | The maximum age of the consent cookie in seconds.                    |
| `expires`  | `Date`                      | The expiration date of the consent cookie.                           |
| `path`     | `string`                    | The path within the website's domain for which the cookie is valid.  |
| `domain`   | `string`                    | The domain for which the cookie is valid.                            |
| `secure`   | `boolean`                   | Indicates if the cookie should only be sent over secure connections. |
| `sameSite` | `Strict` \| `Lax` \| `None` | The SameSite attribute of the consent cookie.                        |

## License

Bite Consent is released under the MIT License.

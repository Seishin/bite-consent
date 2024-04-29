import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { CustomPosition, isCustomPosition, Position } from './Position'
import cookies from './assets/cookies.png'

const CONSENT_COOKIE_NAME = 'cookie_consent'

interface Props {
  privacyPolicyUrl: string
  text?: string
  visibility?: 'auto' | 'visible' | 'hidden'
  position?: Position | CustomPosition
  onAccept?: () => void
}

const BiteConsent = ({ privacyPolicyUrl, text, visibility = 'auto', position = 'bottom-left', onAccept }: Props) => {
  const [visible, setVisible] = React.useState<boolean | undefined>()

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    setVisible(visibility === 'auto' ? !document.cookie.includes(CONSENT_COOKIE_NAME) : visibility === 'visible')
  }, [window, document, visibility])

  const getPosition = () => {
    const errorMessage = `Invalid position! Please provide one of the following: 
                          'top-left', 'top-right', 'bottom-left', 'bottom-right', 
                          or a custom position object with properties: top, left, right, and bottom.`

    if (typeof position === 'string') {
      switch (position) {
        case 'top-left':
          return { top: '2rem', left: '2rem' }
        case 'top-right':
          return { top: '2rem', right: '2rem' }
        case 'bottom-left':
          return { bottom: '2rem', left: '2rem' }
        case 'bottom-right':
          return { bottom: '2rem', right: '2rem' }
        default:
          throw new Error(errorMessage)
      }
    } else if (isCustomPosition(position)) {
      return position
    } else {
      throw new Error(errorMessage)
    }
  }

  const handleAccept = () => {
    if (onAccept) {
      onAccept()
    } else {
      document.cookie = `${CONSENT_COOKIE_NAME}=true; max-age=31536000; path=/`
      setVisible(false)
    }
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          layout
          initial={{ scale: 0.5, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 10, opacity: 0, transition: { duration: 0.1 } }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          style={{
            position: 'fixed',
            ...getPosition(),
            zIndex: 9999,
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: '1rem',
            width: '18rem',
            maxHeight: '18rem',
            borderRadius: '0.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <img src={cookies} alt="cookie" style={{ width: '3.5rem', height: '3.5rem', position: 'absolute', top: '-2rem', left: '1rem' }} />
          <p
            style={{
              fontSize: '0.875rem',
              textAlign: 'start',
              overflow: 'scroll',
              userSelect: 'none',
              marginTop: '1.5rem'
            }}
          >
            {text ??
              'Hey there! We use cookies to keep things running smoothly on our website and to get to know you better. It helps us make your time here as awesome as possible! ❤️'}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'stretch',
              gap: '1rem'
            }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: '#f0f0f0',
                borderRadius: '0.65rem',
                boxShadow: '0 0.1rem 0.25rem rgba(0, 0, 0, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderStyle: 'none',
                cursor: 'pointer'
              }}
              onClick={() => window.open(privacyPolicyUrl, '_blank')}
            >
              Privacy Policy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1,
                borderStyle: 'none',
                backgroundColor: '#38bdf8',
                color: '#ffffff',
                fontWeight: 'bold',
                padding: '0.65rem',
                borderRadius: '0.65rem',
                boxShadow: '0 0.1rem 0.25rem rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
              }}
              onClick={handleAccept}
            >
              Got it
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export { BiteConsent }

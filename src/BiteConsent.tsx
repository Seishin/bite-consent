import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const CONSENT_COOKIE_NAME = 'cookie_consent'

interface Props {
  privacyPolicyUrl: string
  text?: string
  onAccept?: () => void
}

const BiteConsent = ({ privacyPolicyUrl, text, onAccept }: Props) => {
  const [userAlreadyAccepted, setUserAlreadyAccepted] = React.useState(document.cookie.includes(CONSENT_COOKIE_NAME))

  const handleAccept = () => {
    if (onAccept) {
      onAccept()
    } else {
      document.cookie = `${CONSENT_COOKIE_NAME}=true; max-age=31536000; path=/`
      setUserAlreadyAccepted(true)
    }
  }

  return (
    <AnimatePresence>
      {userAlreadyAccepted ? null : (
        <motion.div
          layout
          initial={{ scale: 0.5, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 10, opacity: 0, transition: { duration: 0.1 } }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            zIndex: 9999,
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: '1rem',
            width: '16rem',
            maxHeight: '18rem',
            borderRadius: '0.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <p
            style={{
              fontSize: '0.875rem',
              textAlign: 'start',
              overflow: 'scroll',
              userSelect: 'none'
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
      )}
    </AnimatePresence>
  )
}

export { BiteConsent }

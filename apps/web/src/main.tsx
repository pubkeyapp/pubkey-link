import { WebCoreFeature } from '@pubkey-link/web-core-feature'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

// Polyfill the browser, prevents the error "Uncaught ReferenceError: Buffer is not defined"
if (typeof window !== 'undefined' && typeof window.global === 'undefined' && typeof Buffer === 'undefined') {
  window['global'] = window
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.Buffer = require('buffer').Buffer
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <WebCoreFeature />
  </StrictMode>,
)

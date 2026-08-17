import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './slices/index.js'
import { I18nextProvider } from 'react-i18next'
import i18next from './locales/i18next.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <StrictMode>
        <App />
      </StrictMode>
    </I18nextProvider>
  </Provider>,
)

import { StrictMode } from 'react'
import * as Sentry from "@sentry/react"
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import filter from 'leo-profanity'
import { configureStore } from '@reduxjs/toolkit'
import App from './App.jsx'
import i18next from './locales/i18next.js'
import authReducer from './slices/authSlice.js'
import channelsReducer from './slices/channelsSlice.js'
import messagesReducer from './slices/messagesSlice.js'
import modalReducer from './slices/modalSlice.js'

const init = async (socketInstance) => {
  Sentry.init({
    dsn: import.meta.env.VITE_BUGSINK_DSN, 
    tracesSampleRate: 0.0, 
  })

  filter.loadDictionary('ru')
  filter.add(filter.getDictionary('en'))

    await i18next.changeLanguage('ru')

  const store = configureStore({
    reducer: {
      auth: authReducer,
      channels: channelsReducer,
      messages: messagesReducer,
      modal: modalReducer,
    },
  })

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <MantineProvider>
          <Notifications position="top-right" zIndex={1000} />
            <StrictMode>
              <App socket={socketInstance}/>
            </StrictMode>
        </MantineProvider>
      </I18nextProvider>
    </Provider>
  )
}

export default init

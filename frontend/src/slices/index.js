import authReducer from './authSlice.js'
import channelsReducer from './channelsSlice.js'
import messagesReducer from './messagesSlice.js'
import modalReducer from './modalSlice.js'

export default {
  auth: authReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  modal: modalReducer,
}

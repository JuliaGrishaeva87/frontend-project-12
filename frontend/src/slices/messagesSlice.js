import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = [...payload]
    },
    addMessage: () => {},
    editMessage: () => {},
    removeMessage: () => {}
  }
})

export const { setMessages, addMessage, editMessage, removeMessage } = messagesSlice.actions

export default messagesSlice.reducer
import { createSlice } from "@reduxjs/toolkit"
import { removeChannel } from "./channelsSlice"

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
    addMessage: (state, { payload }) => {
      state.messages.push(payload)
    },
    editMessage: () => {},
    removeMessage: () => {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const removeChannelId = payload.id
        state.messages = state.messages.filter(message => message.channelId !== removeChannelId)
      })
  }
})

export const { setMessages, addMessage, editMessage, removeMessage } = messagesSlice.actions

export default messagesSlice.reducer
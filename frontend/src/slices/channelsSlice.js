import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  channels: [],
  currentChannel: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = [...payload]
      state.currentChannel = payload[0]
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannel = payload
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload)
    },
    editChannel: (state, {payload}) => {
      const channel = state.channels.find(c => c.id === payload.id)
      channel && (channel.name = payload.name)
      state.currentChannel?.id === payload.id && (state.currentChannel.name = payload.name)
    },
    removeChannel: (state, {payload}) => {
      state.channels = state.channels.filter(channel => channel.id !== payload.id)
      state.currentChannel = state.currentChannel?.id === payload.id ? state.channels[0] : state.currentChannel
    }
  }
})

export const { setChannels, setCurrentChannel, addChannel, editChannel, removeChannel } = channelsSlice.actions

export default channelsSlice.reducer
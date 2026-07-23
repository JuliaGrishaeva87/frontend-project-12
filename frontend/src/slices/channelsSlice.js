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
    addChannel: () => {},
    editChannel: () => {},
    removeChannel: () => {}
  }
})

export const { setChannels, setCurrentChannel, addChannel, editChannel, removeChannel } = channelsSlice.actions

export default channelsSlice.reducer
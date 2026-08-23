import { createSlice } from '@reduxjs/toolkit'
import { setCurrentChannel, removeChannel, editChannel } from './channelsSlice.js'

const initialState = {
  isOpened: false,
  type: '',
  item: '',
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpened = true
      state.type = payload.type
      state.item = payload.item
    },
    closeModal: (state) => {
      state.isOpened = false
      state.type = ''
      state.item = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentChannel, (state) => {
        state.isOpened = false
        state.type = ''
        state.item = ''
      })
      .addCase(removeChannel, (state) => {
        state.isOpened = false
        state.type = ''
        state.item = ''
      })
      .addCase(editChannel, (state) => {
        state.isOpened = false
        state.type = ''
        state.item = ''
      })
  }
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const savedUser = JSON.parse(localStorage.getItem('userId'))

const initialState ={
  username: savedUser ? savedUser.username : null,
  token: savedUser? savedUser.token : null,
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.username = payload.username
      state.token = payload.token
      localStorage.setItem('userId', JSON.stringify(payload))
    },
    removeCredentials: (state) => {
    state.username = null
    state.token = null
    localStorage.removeItem('userId')
  }
  }
})

export const { setCredentials, removeCredentials } = authSlice.actions

export default authSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    user: null
  },
  reducers: {
    setUserInfo: (state, action) => {
      console.log('action set user info', action.type)
      state.status = action.payload.status;
      state.user = action.payload.data;
    },
    logout: (state, action) => {
      console.log('action logout', action.type)

      localStorage.removeItem('token');
      state.user = null;
    },
    login: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      window.location.href = action.payload.returnUrl || '/'
    },
    /// có bao nhiêu feature cần thay đổi store =>
  }
})

// Action creators are generated for each case reducer function
export const { setUserInfo, logout, login } = authSlice.actions

export default authSlice.reducer
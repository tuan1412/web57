import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../api/request';

export const fetchPost = createAsyncThunk('posts/fetchPosts', async (id) => {
  const response = await axios.get(`/api/posts/${id}`);
  return response
})

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    status: 'idle',
    post: null
  },
  reducers: {
  },
  extraReducers: {
    [fetchPost.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.status = 'success';
      state.post = action.payload.data;
    },
    [fetchPost.rejected]: (state, action) => {
      state.status = 'error';
      state.post = null;
    }
  }
})

// Action creators are generated for each case reducer function
export const { } = postSlice.actions

export default postSlice.reducer
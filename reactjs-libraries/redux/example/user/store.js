// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

// Use for get all data from api
export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await axios.post('/user/list')
  return response.data
})

// Use for get some data before update it
export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.post(`/user/edit/${id}`)
  return response.data
})

// Use for create new data
export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  const response = await axios.post('/user/store', user)

  // To refresh all data in redux
  // because there is data added
  await dispatch(getAllData())
  return response.data
})

// Digunakan ketika menghapus data
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  const response = await axios.post(`/user/${id}/delete`)

  // To refresh all data in redux
  // because there is data deleted
  await dispatch(getAllData())
  return response.data
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // When getAllData called, we want to save to property `data` in reducer
      // This is for easy when we need the data
      .addCase(getAllData.fulfilled, (state, action) => {
        state.data = action.payload
      })
      // When getUser called, we want save to property 'selectedUser' in reducer
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appUsersSlice.reducer
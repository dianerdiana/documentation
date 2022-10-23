// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await axios.get('/user/list')
  return response.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get('/user/list', params)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.total
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get(`/user/${id}/edit`)
  return response.data.data
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  const response = await axios.post('/user/store', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return response.data
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  const response = await axios.delete(`/user/${id}/delete`)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return response.data
})

export const updateUser = createAsyncThunk('appUsers/updateUser', async (user, { dispatch, getState }) => {
  const response = await axios.patch('/user/update', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return response.data
})

export const updateStatus = createAsyncThunk('appUsers/updateStatus', async (id, { dispatch, getState }) => {
  const response = await axios.patch(`/user/${id}/status`)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return response.data
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appUsersSlice.reducer

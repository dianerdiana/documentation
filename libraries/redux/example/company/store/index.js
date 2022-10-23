// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appCompanies/getAllData', async () => {
  const response = await axios.get('/company/list')
  return response.data
})

export const getData = createAsyncThunk('appCompanies/getData', async params => {
  const response = await axios.get('/company/list', params)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.total
  }
})

export const getCompany = createAsyncThunk('appCompanies/getCompany', async id => {
  const response = await axios.get(`/company/${id}/edit`)
  return response.data.data
})

export const addCompany = createAsyncThunk('appCompanies/addCompany', async (company, { dispatch, getState }) => {
  const response = await axios.post('/company/store', company)
  await dispatch(getData(getState().companies.params))
  await dispatch(getAllData())
  return response.data
})

export const deleteCompany = createAsyncThunk('appCompanies/deleteCompany', async (id, { dispatch, getState }) => {
  const response = await axios.delete(`/company/${id}/delete`)
  await dispatch(getData(getState().companies.params))
  await dispatch(getAllData())
  return response.data
})

export const updateCompany = createAsyncThunk('appCompanies/updateCompany', async (company, { dispatch, getState }) => {
  const response = await axios.patch('/company/update', company)
  await dispatch(getData(getState().companies.params))
  await dispatch(getAllData())
  return response.data
})

export const updateStatus = createAsyncThunk('appCompanies/updateStatus', async (id, { dispatch, getState }) => {
  await axios.patch(`/company/${id}/status`)
  await dispatch(getData(getState().companies.params))
  await dispatch(getAllData())
  return id
})

export const appCompaniesSlice = createSlice({
  name: 'appCompanies',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedCompany: null
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
      .addCase(getCompany.fulfilled, (state, action) => {
        state.selectedCompany = action.payload
      })
  }
})

export default appCompaniesSlice.reducer

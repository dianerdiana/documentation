// axios import
import axios from 'axios'

export const getAllData = async () => {
  const response = await axios.get('/api/users/list/all-data')
  return response.data
}

export const getData = async params => {
  const response = await axios.get('/api/users/list', params)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
}

export const getUser = async id => {
  const response = await axios.get('/api/users/user', { id })
  return response.data
}

export const addUser = async (user) => {
  const response = await axios.post('/api/users/store', user)
  return response.data
}

export const deleteUser = async (id) => {
  const response = await axios.delete('/api/users/delete', { id })
  return response.data
}

export const updateUser = async (user) => {
  const response = await axios.post('/api/users/update', user)
  return response.data
}

export const updateStatus = async (id) => {
  const response = await axios.post(`/api/users/status`, { id })
  return response.data
}

import mock from './mock'

// ** Utils
import { paginateArray } from './utils'

const data = {
  users: [
    {
      id: 1,
      fullName: 'John Doe',
      email: 'johndoed@mail.com',
      status: '1',
      age: 23
    },
    {
      id: 2,
      fullName: 'Jonathan Doe',
      email: 'jonathandoe@mail.com',
      status: '0',
      age: 18
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/users/list/all-data').reply(200, data.users)

// GET Updated DATA
mock.onGet('/api/users/list').reply(config => {
  const {
    q = '',
    page = 1,
    perPage = 10,
    sort = 'asc',
    status = null,
    sortColumn = 'fullName'
  } = config

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()

  const dataAsc = data.users.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    user =>
      (user.email.toLowerCase().includes(queryLowered) ||
        user.fullName.toLowerCase().includes(queryLowered)) &&
      user.status === (status || user.status)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      users: paginateArray(filteredData, perPage, page)
    }
  ]
})

// POST: Add new user
mock.onPost('/api/users/store').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data)
  const highestValue = data.users.reduce((a, b) => (a.id > b.id ? a : b)).id

  user.id = highestValue + 1

  data.users.push(user)

  return [201, { status: true, message: 'Data add successfully' }]
})

// GET USER
mock.onGet('/api/users/user').reply(config => {
  const { id } = config
  const user = data.users.find(i => i.id === id)
  return [200, { user }]
})

// UPDATE USER
mock.onPost('/api/users/update').reply(config => {
  const user = JSON.parse(config.data)
  data.users = data.users.map(object => {
    if (object.id === +user.id) {
      return {
        ...object,
        ...user,
      }
    }
    return object
  })
  return [200, { status: true, message: 'Data updated successfully', data: data.users}]
})

// UPDATE: Update Status User
mock.onPost('/api/users/status').reply(config => {
  const { id } = JSON.parse(config.data)

  const indexUser = data.users.findIndex(i => i.id_user === +id)
  data.users[indexUser].status = data.users[indexUser].status === 1 ? 0 : 1

  return [
    200,
    {
      message: 'Data update successfully',
      status: true
    }
  ]
})

// DELETE: Deletes User
mock.onDelete('/api/users/delete').reply(config => {
  // Get user id from URL
  let userId = config.id

  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.users.findIndex(t => t.id === userId)
  data.users.splice(userIndex, 1)

  return [200, { status: true, message: 'Data deleted successfully' }]
})

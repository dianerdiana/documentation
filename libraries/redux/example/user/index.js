// Import react
import React, { useEffect } from 'react'

// Store & Redux
import { getAllData, deleteUser } from './store'
import { useDispatch, useSelector } from 'react-redux'

// Fake Data
const fakeData = [
  {
    id: 1,
    name: 'John Doe'
  },
  {
    id: 2,
    name: 'Jonathan Doe'
  }
]

const UserList = () => {
  // vars
  const dispatch = useDispatch()

  // 'useSelector' has Callback all of data object in redux
  // Remember the reducer name in file 'rootReducer', 
  // We exported 'users' from there, and we get that here
  const store = useSelector(state => state.users)

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    dispatch(getAllData())
  }, [store.data.length])

  return (
    <div>
      <li>
        // Remember! that when we called 'getAllData', 
        // The data that we get will store in property 'data'.
        // So we have to call 'store.data' to get it
        // Imagine that we get 'fakeData' from store.data
        {store.data.map(user => {
            return (
              <ol key={user.id}>
                {user.name}
                <br />
                <button onClick={() => {
                  handleDelete(user.id)
                }}>
                  Delete
                </button>
              </ol>
            )
          })
        }
      </li>
    </div>
  )
}

export default UserList
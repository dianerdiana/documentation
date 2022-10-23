// Import react
import React, { useEffect, useState } from 'react'

// Store
import { getAllData, deleteUser } from './store'

const UserList = () => {
  const [store, setStore] = useState([])

  // Handle delete
  const handleDelete = (id) => {
    deleteUser(id)
  }

  useEffect(() => {
    getAllData().then(users => {
      setStore(users)
    })
  }, [store.length])

  return (
    <div>
      <li>
        {store.map(user => {
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
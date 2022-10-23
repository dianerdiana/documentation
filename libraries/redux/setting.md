# Cara menggunakan menggunakan react-redux
___

Dokumentasi bisa di lihat [react-redux documentation]('https://react-redux.js.org/')

## Install Package

Hal pertama yang dibutuhkan untuk menggunakan redux adalah packagenya, yang perlu di install:

1. redux
2. react-redux
3. @reduxjs/toolkit
4. redux-thunk

## Setting Provider di File Utama `index.js` ReactJS

```javascript
// ** Redux Imports
import { store } from './redux/store'
import { Provider } from 'react-redux'

// ** Lazy load app
const UserList = lazy(() => import('./user'))

ReactDOM.render(
    <Provider store={store}>
      <UserList />
    </Provider>,
  document.getElementById('root')
)
```

## Buat Folder Redux di File ReactJs

Buat Folder `redux` di dalam folder `src`. Atau yang satu level dengan index.js yang akan di render melalui browser.

## Buat File `store.js` di Folder Redux

Setelah folder redux tadi siap, lalu kita buat file `store.js` di dalamnya.

Setelah itu kita buat konfigurasi seperti berikut ini:

```javascript
// ** Redux Imports
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})

export { store }
```

Aturan baru untuk membuat store bukan lagi di import dari file `react-reduct`, melainkan dari `@reduxjs/toolkit` seperti di atas.

## Buat File `rootReducer` di Folder `Redux`

File `rootReducer` ini akan menampung store yang akan kita buat nanti di folder-folder tertentu yang memang dibutuhkan untuk menyimpan data.

Untuk sementara kita kosongkan itu.

## Buat Folder `user` Sebagai Contoh
## Buat File `index.js` & `store.js` di dalam Folder `user`
## Konfigurasi `store.js` di folder `user`

Contoh konfigurasi store yang kita buat, dan fetch data menggunakan axios.

```javascript
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

```

Konfigurasi store di atas akan memudahkan kita saat membutuhkan data yang ingin ditampilkan di halaman.

## Setting Reducer di File `rootReducer` yang Ada di Dalam Folder `redux`

Setelah Store tadi kita buat, saatnya menghubungkan ke redux.
Caranya mudah, cukup tuliskan kode di bawah ini di dalam file `rootReducer`

```javascript
// Import store from specipic folder that we created
import users from '../user/store'

// Var for accomodate reducers
const rootReducer = {
  users
}

export default rootReducer
```

## Cara Menggunakan `redux` di file `index.js` yang ada di dalam Folder `user`

Cara menggunakannya cukup mudah, bisa langsung dilihat contoh di bawah:

```javascript
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

```

Mungkin anda bisa memahami kode di atas, karena penjelasannya juga sudah tersedia di komen nya, bagi yang belum terbiasa pakai bahasa inggris, bisa download extension `google translate` untuk browser Chrome.

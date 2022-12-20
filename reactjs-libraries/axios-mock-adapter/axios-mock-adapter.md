# Cara simulasi API menggunakan `axios-mock-adapter`

## **Live Demo bisa dilihat** [**disini**](https://codesandbox.io/s/axios-mock-adapter-reactjs-4x6px2?file=/src/App.js)

Simulasi API ini seperti ketika meng-*consume* api tanpa harus menggunakan back-end. Jadi, datanya saya buat sendiri, routes api nya juga saya buat sendiri full dari *front-end* react. Tapi, saat saya memanggil routes tersebut benar-benar menggunakan `fetch` atau saya lebih sering menggunakan `axios`.

Menggunakan `fakeData`, sebuah array atau object mungkin akan lebih mudah. Tapi, saat integrasi nanti prosesnya pasti akan lebih lama. Karena, saya harus setting api dan menyesuaikan data yang saya terima dari api tersebut. Maksudnya, ketika menggunakan `fakeData` kita tidak bisa mendapatkan nilai kembalian yang mungkin bisa digunakan untuk validasi, apakah request tersebut berhasil atau gagal. Tapi ini bisa di atasi dengan cara membuat promise, cuman effort yang harus dibayar tentu akan lebih lama dibandingkan menggunakan `axios-mock-adapter`. BTW, saya juga pernah mencoba fetch menggunakan **Promise** dan ternyata itu sangat melelahkan.

Maka dari itu, menggunakan `axios-mock-adapter` ini sangat memudahkan saya ketika ingin melakukan simulasi fetching menggunakan axios dan akan memberikan sebuah gambaran yang jelas serta akan lebih mengefektifkan waktu saya pada saat integrasi dengan *back-end* nantinya.


# Install Package

Package yang dibutuhkan untuk membuat `Fake Database` ini adalah:

1. `axios`
2. `axios-mock-adapter`

## `axios`
Axios merupakan library opensource yang digunakan untuk request data melalui http. Axios terkenal dengan keunggulannya yaitu ringan, promised-based, mendukung async dan await untuk kode yang aynchronous.

## `axios-mock-adapter`
Adaptor Axios yang memungkinkan permintaan tiruan dengan mudah.

# Setting Adapter

Ada beberapa langkah yang akan saya lakukan:

### * Buat Folder `@fake-db`
### * Buat File `mock.js` di Folder `@fake-db`

Di dalamnya, saya akan buat adapter baru dengan cara seperti di bawah ini:

```javascript
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

export default mock
```

Dokumentasinya bisa dilihat di [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter)

# Install Package

Package yang dibutuhkan untuk membuat `Fake Database` ini adalah:

1. `axios`
2. `axios-mock-adapter`

## `axios`
Axios merupakan library opensource yang digunakan untuk request data melalui http. Axios terkenal dengan keunggulannya yaitu ringan, promised-based, mendukung async dan await untuk kode yang aynchronous.

## `axios-mock-adapter`
Adaptor Axios yang memungkinkan permintaan tiruan dengan mudah.

# Membuat Request Tiruan Untuk Users

### Tambahkan File `users.js` di Folder `@fake-db`

### * Import `mock` dari file `mock.js`

```javascript
// Import mock from file 'mock.js'
import mock from './mock'
```
### * Buat data yang ingin diberikan ketika api dipanggil

```javascript
const data = {
  users: [
    {
      id: 1,
      fullName: 'John Doe',
      age: 24,
      email: 'johndoe@mail.com',
      password: 'JohnDoe',
      status: 1
    },
    {
      id: 2,
      fullName: 'Jonathan Doe',
      age: 18,
      email: 'jonathandoe@mail.com',
      password: 'JonathanDoe',
      status: 0
    }
  ]
}
```

### * Buat request mock api
  
```javascript
// GET ALL DATA
mock.onGet('/api/users/list').reply(200, data.users)
```

Yang perlu dipahami di atas, 
1. `onGet` adalah function yang ingin dipakai untuk routes dan dia menerima argument berupa `string` yang merupakan route yang ingin digunakan saat pemanggilan nanti.
2. `reply` adalah function yang menerima dua nilai, pertama adalah status dari [http request status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). Lalu yang kedua adalah data yang ingin diberikan. Di sini saya memberikan response berupa **array** dari variabel `data.users`.

## Jadi keseluruhan file `users.js` akan seperti ini
```javascript
// Import mock from file 'mock.js'
import mock from './mock'

const data = {
  users: [
    {
      id: 1,
      fullName: 'John Doe',
      age: 24,
      email: 'johndoe@mail.com',
      password: 'JohnDoe',
      status: 1
    },
    {
      id: 2,
      fullName: 'Jonathan Doe',
      age: 18,
      email: 'jonathandoe@mail.com',
      password: 'JonathanDoe',
      status: 0
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/users/list').reply(200, data.users)
```
 # Export Semua Mock yang Dibuat, seperti `users.js`

### * Buat file `index.js` di folder `@fake-db`

### * Import `mock` dari `mock.js`

```javascript
import mock from './mock'
```

### * Import `mock api request` dari `users.js`

```javascript
import './users'
```

** Sesuaikan dengan letak file / folder yang ingin di import

### * Tambahkan kode berikut di bagian paling bawah

```javascript
mock.onAny().passThrough()
```

**Ini supaya bisa mencari routes yang cocok tanpa harus mengexportnya satu-persatu**

## Jadi Seluruh kode dalam file `index.js` di folder `@fake-db`, seperti ini:

```javascript
import mock from './mock'

import './users'

mock.onAny().passThrough()
```

# Import Folder `@fake-db`, Konfigurasi Mock ke ReactJS

Caranya sangat mudah, tinggal import dari file `index.js` yang utama.

```javascript
// ** React Imports
import ReactDOM from 'react-dom'
import { lazy } from 'react'

// ** Fake Database
import './@fake-db'

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))
ReactDOM.render(
  <LazyApp/>,
  document.getElementById('root')
)
```

# Cara Menggunakannya

### * Masuk ke file `App.js` lalu tuliskan kode berikut:

```javascript
import { useState, useEffect } from 'react'

import axios from 'axios'

export default function App() {
  const [data, setData] = useState([])

  const getData = async () => {
    const response = await axios.get('/api/users/list/all-data')
    setData(response.data)
  }

  useEffect(() => {
    getData()
  }, [data.length])

  return (
    <div className='App'>
      <h1>Hello DierDragoon</h1>
      <h2>This is data from mock api!</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```
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

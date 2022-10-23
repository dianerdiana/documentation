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
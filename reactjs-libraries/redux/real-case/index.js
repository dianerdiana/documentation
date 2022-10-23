
// ** Redux Imports
import { store } from './redux/store'
import { Provider } from 'react-redux'

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))

ReactDOM.render(
    <Provider store={store}>
      <LazyApp />
    </Provider>,
  document.getElementById('root')
)

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
import UserList from './user/list'
import CompanyList from './company/list'

const App = () => {
  return (
    <div className='root'>
      <UserList />
      <CompanyList />
    </div>
  )
}

export default App
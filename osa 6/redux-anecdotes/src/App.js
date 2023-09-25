import Notification from './components/Notification'
import Filter from './components/Filter'
import CreateNew from './components/Create'
import List from './components/List'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <List />
      <CreateNew />
    </div>
  )
}

export default App
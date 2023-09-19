import CreateNew from './components/Create'
import List from './components/List'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <List />
      <CreateNew />
    </div>
  )
}

export default App
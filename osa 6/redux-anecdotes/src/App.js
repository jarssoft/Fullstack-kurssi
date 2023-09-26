import Notification from './components/Notification'
import Filter from './components/Filter'
import CreateNew from './components/Create'
import List from './components/List'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  
  useEffect(() => {
    anecdoteService.getAll().then(notes => {
      dispatch(setAnecdotes(notes))
    })
  }, [dispatch])

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
import { useSelector, useDispatch } from 'react-redux'
import { makeVote } from './reducers/anecdoteReducer'
import CreateNew from './components/Create'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {    
    dispatch(makeVote(id))
    console.log('vote', id)
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <CreateNew />

    </div>
  )
}

export default App
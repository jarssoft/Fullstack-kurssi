import { useSelector, useDispatch } from 'react-redux'
import { makeVote } from '../reducers/anecdoteReducer'

const List = () => {
  
  const dispatch = useDispatch()

  const anecdotes = useSelector(({filter, notes}) => {
    return notes.filter(
      anecdote => anecdote.content.includes(filter)
      )
  })
  
  const vote = (id) => {    
    dispatch(makeVote(id))
    console.log('vote', id)
  }

  return(
    <>
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
    </>
  )
}

export default List
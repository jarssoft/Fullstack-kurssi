import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const updateNote = updatedNote =>
    axios
    .put(`http://localhost:3001/anecdotes/${updatedNote.id}`, updatedNote)
    .then(res => res.data)

  const handleVote = (anecdote) => {
    console.log('vote')
    dispatch({ type: "PUT", payload: `Äänestettiin anekdoottia "${anecdote.content}".` })
    updateNoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: false
  })

  const queryClient = useQueryClient()

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>Error: {result.error.message}</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

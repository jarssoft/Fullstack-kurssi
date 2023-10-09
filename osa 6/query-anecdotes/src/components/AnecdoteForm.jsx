import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

const AnecdoteForm = () => {

  const createNote = newNote => {
    console.log(`newNote ${newNote}`)
    axios
    .post('http://localhost:3001/anecdotes', newNote)
    .then(res => res.data)
  }
  
  const newNoteMutation = useMutation({ mutationFn: createNote })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })
    console.log(`new anecdote ${content}`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

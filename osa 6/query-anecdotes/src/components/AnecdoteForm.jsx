import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const createNote = newNote => {
    console.log(`newNote ${newNote}`)
    return axios
    .post('http://localhost:3001/anecdotes', newNote)
    .then(res => res.data)
  }

  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createNote, 
    onSuccess: (newNote) => {      
      console.log(`new anecdote: ${newNote}`)
      console.log(`invalidoi`)
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: "PUT", payload: `Anekdootti "${content}" lisättiin.` })
    //console.log(`new anecdote ${content}`)
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

import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { pushNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const CreateNew = () => {
  
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    
    dispatch(pushNotification("Luotiin anekdootti."))
    setTimeout(() => {
      dispatch(pushNotification(""))
    }, 5000)
  }

  return(
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default CreateNew
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addAnAnecdote } from '../reducers/anecdoteReducer'

const CreateNew = () => {
  
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''    
    dispatch(addAnAnecdote(content))   
    dispatch(setNotification("Luotiin anekdootti.", 5))
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
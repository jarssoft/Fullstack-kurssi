import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const generateId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    makeVote(state, action) {

      const id = action.payload

      console.log('voting ', id)

      const anecoteToChange = state.find(n => n.id === id)

      console.log('voting ', JSON.parse(JSON.stringify(anecoteToChange)))

      const changedAnecote = { 
        ...anecoteToChange, 
        votes: anecoteToChange.votes += 1
      }

      console.log('voting ', JSON.parse(JSON.stringify(changedAnecote)))

      return state
 
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, makeVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()    
    dispatch(setAnecdotes(notes))
  }
}

export const addAnAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
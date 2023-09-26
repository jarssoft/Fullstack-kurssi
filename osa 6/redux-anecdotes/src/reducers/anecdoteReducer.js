import { createSlice } from '@reduxjs/toolkit'

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
export default anecdoteSlice.reducer
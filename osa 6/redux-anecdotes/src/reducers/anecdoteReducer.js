import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const generateId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

/*
const reducer = (state = initialState, action) => {

  console.log('state now: ', state)
  
  switch (action.type) {
    case 'VOTE':
      const id = action.payload.id

      console.log('voting ', id)

      const anecoteToChange = state.find(n => n.id === id)

      const changedAnecote = { 
        ...anecoteToChange, 
        votes: anecoteToChange.votes += 1
      }

      return state.map(anecote =>
        anecote.id !== id ? anecote : changedAnecote 
      )
    case 'NEW_ANECDOTE':
      console.log('adding')
      return state.concat(action.payload)      

    default: // jos ei mikään ylläolevista tullaan tänne
    return state
  }
 
}

export const createAnecdote = (content) => { 
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      votes: 0,
      id: getId()
    }
  }
}

export const makeVote = (id) => { 
  return {
    type: 'VOTE',
    payload: {
      id: id
    }
  }
}

export default reducer
*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        votes: 0,
        id: generateId(),
      })
    },
    makeVote(state, action) {

      const id = action.payload

      console.log('voting ', id)

      const anecoteToChange = state.find(n => n.id === id)


      //console.log('state ', state)
      console.log('voting ', JSON.parse(JSON.stringify(anecoteToChange)))

      //console.log('voting ', anecoteToChange)


      const changedAnecote = { 
        ...anecoteToChange, 
        votes: anecoteToChange.votes += 1
      }

      console.log('voting ', JSON.parse(JSON.stringify(changedAnecote)))


      return state

      /*
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      ) 
      */    
    }
  },
})

export const { createAnecdote, makeVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

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
    default: // jos ei mikään ylläolevista tullaan tänne
    return state
  }
 
}

export const makeVote = (id) => { return {
  type: 'VOTE',
  payload: {
    id: id
  }
}
}


export default reducer
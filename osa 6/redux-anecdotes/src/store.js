import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer: {
      notes: anecdoteReducer,
      filter: filterReducer
    }
  })

console.log(store.getState())

export default store
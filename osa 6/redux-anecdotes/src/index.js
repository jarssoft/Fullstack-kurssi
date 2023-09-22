import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import anecdoteReducer, { createAnecdote } from './reducers/anecdoteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'

const reducer = combineReducers({
  notes: anecdoteReducer,
  filter: filterReducer
  })

const store = createStore(reducer)

console.log(store.getState())

store.subscribe(() => console.log(store.getState()))
//store.dispatch(filterChange(''))
//store.dispatch(createAnecdote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
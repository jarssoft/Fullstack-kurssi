import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    deepFreeze(state)
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('good is incremented multiple times', () => {
    const action = {
      type: 'GOOD'
    }
    let state = initialState

    deepFreeze(state)
    
    for (let i = 1; i <= 10; i++) {
      state = counterReducer(state, action)
    }

    expect(state).toEqual({
      good: 10,
      ok: 0,
      bad: 0
    })
  })

  test('neutral is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset clears all', () => {
    const action1 = {
      type: 'GOOD'
    }
    const action2 = {
      type: 'ZERO'
    }

    let state = initialState
    deepFreeze(state)
    state = counterReducer(state, action1)
    const newState = counterReducer(state, action2)
    
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

})
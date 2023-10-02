import { createSlice } from '@reduxjs/toolkit'  

const initialState = "Initial notification!"

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    pushNotification(state, action) {    
      return action.payload
    },
    clearNotification(state, action) {    
        return ""
      },
  },
})

export const setNotification = (message, time) => {
  return async dispatch => {
    
    setTimeout(() => {
      dispatch(clearNotification(""))
    }, time*1000)

    dispatch(pushNotification(message))
  }
}

export const { pushNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
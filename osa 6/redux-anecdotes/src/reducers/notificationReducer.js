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

export const { pushNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
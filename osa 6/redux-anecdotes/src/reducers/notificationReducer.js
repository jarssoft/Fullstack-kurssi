import { createSlice } from '@reduxjs/toolkit'  

const initialState = "Initial notification!"

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    pushNotification(state, action) {    
      return action.payload
    },
  },
})

export const { pushNotification } = notificationSlice.actions
export default notificationSlice.reducer
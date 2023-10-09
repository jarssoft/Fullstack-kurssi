import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "PUT":
        return action.payload
    case "CLEAR":
        return ""
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(notificationReducer, 0)

  return (
    <NotificationContext.Provider value={[counter, counterDispatch] }>
      {props.children} 
    </NotificationContext.Provider>
  )
}

export default NotificationContext
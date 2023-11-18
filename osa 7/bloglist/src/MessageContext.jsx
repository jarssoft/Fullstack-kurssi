import { createContext, useReducer, useContext } from "react"

const messageReducer = (state, action) => {
   switch (action.type) {
      case "NTC":
         return { notice: action.payload }
      case "ERR":
         return { error: action.payload }
      case "CLR":
         return {}
      default:
         return state
   }
}

const MessageContext = createContext()

export const MessageContextProvider = (props) => {
   const [message, messageDispatch] = useReducer(messageReducer, 0)

   return (
      <MessageContext.Provider value={[message, messageDispatch]}>
         {props.children}
      </MessageContext.Provider>
   )
}

export const useMessageValue = () => {
   return useContext(MessageContext)[0]
}

export const useMessageDispatch = () => {
   return useContext(MessageContext)[1]
}

export default MessageContext

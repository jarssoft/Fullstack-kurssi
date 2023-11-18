import { createContext, useReducer, useContext } from "react"

const loginReducer = (state, action) => {
   switch (action.type) {
      case "LOGIN":
         return action.payload
      case "LOGOUT":
         return null
      default:
         return state
   }
}

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
   const [login, loginDispatch] = useReducer(loginReducer, null)

   return (
      <LoginContext.Provider value={[login, loginDispatch]}>
         {props.children}
      </LoginContext.Provider>
   )
}

export const useLoginValue = () => {
   return useContext(LoginContext)[0]
}

export const useLoginDispatch = () => {
   return useContext(LoginContext)[1]
}

export default LoginContext

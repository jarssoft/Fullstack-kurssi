import { useState } from "react"

const Login = ({ handleLogin }) => {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")

   const handle = async (event) => {
      event.preventDefault()

      handleLogin(username, password)
      setUsername("")
      setPassword("")
   }

   return (
      <>
         <h2>Log in to application</h2>
         <form onSubmit={handle}>
            <div>
               username
               <input
                  type="text"
                  value={username}
                  name="Username"
                  id="username"
                  onChange={({ target }) => setUsername(target.value)}
               />
            </div>
            <div>
               password
               <input
                  type="password"
                  value={password}
                  name="Password"
                  id="password"
                  onChange={({ target }) => setPassword(target.value)}
               />
            </div>
            <button type="submit" id="login-button">
               login
            </button>
         </form>
      </>
   )
}

export default Login

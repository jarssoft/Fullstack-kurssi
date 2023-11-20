import { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Messages from "./components/Messages"
import AddBlog from "./components/AddBlog"
import Togglable from "./components/Toggable"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { useMessageDispatch } from "./MessageContext"
import { useLoginContext } from "./LoginContext"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import "./index.css"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

const App = ({ client }) => {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")

   const blogFormRef = useRef()
   const queryClient = useQueryClient()

   useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
      if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON)
         loginDispatch({
            type: "LOGIN",
            payload: user,
         })
         blogService.setToken(user.token)
      }
   }, [])

   const newNoteMutation = useMutation({
      mutationFn: blogService.create,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["blogs"] })
      },
   })

   const updateNoteMutation = useMutation({
      mutationFn: blogService.put,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["blogs"] })
      },
   })

   const removeNoteMutation = useMutation({
      mutationFn: blogService.remove,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["blogs"] })
      },
   })

   const { data, refetch } = useQuery({
      queryKey: ["blogs"],
      queryFn: blogService.getAll,
   })

   const messageDispatch = useMessageDispatch()
   const [user, loginDispatch] = useLoginContext()

   const padding = {
      padding: 5,
   }

   const handleLogin = async (event) => {
      event.preventDefault()
      //console.log('logging in with', username, password)
      try {
         const user = await loginService.login({
            username,
            password,
         })

         window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))

         blogService.setToken(user.token)
         loginDispatch({
            type: "LOGIN",
            payload: user,
         })
         setUsername("")
         setPassword("")
      } catch (exception) {
         messageDispatch({
            type: "ERR",
            payload: `Wrong credentials!`,
         })

         setTimeout(() => {
            messageDispatch({ type: "CLR" })
         }, 5000)
      }
   }

   const createBlog = async (blogObject) => {
      blogFormRef.current.toggleVisibility()

      blogObject.user = user

      //await blogService.create(blogObject)
      newNoteMutation.mutate({ ...blogObject, likes: 0 })

      console.log(blogObject)

      messageDispatch({
         type: "NTC",
         payload: `A new blog ${blogObject.title} by ${blogObject.author} added.`,
      })

      setTimeout(() => {
         messageDispatch({ type: "CLR" })
      }, 5000)
   }

   const like = (id) => {
      const newblogs = data.map((blog) => {
         if (blog.id === id) {
            console.log(`like ${blog.title}`)
            updateNoteMutation.mutate({ ...blog, likes: blog.likes + 1 })
         }
         return blog
      })
      refetch()
   }

   const remove = async (id) => {
      const newblogs = data.filter((blog) => {
         if (blog.id === id) {
            console.log(`remove ${blog.title}`)
            removeNoteMutation.mutate(blog)
            console.log(`removed ${blog.title}`)
            return false
         } else {
            return true
         }
      })
      client.setQueryData("blogs", newblogs)
      refetch()
   }

   const logOut = () => {
      loginDispatch({ type: "LOGOUT" })
      window.localStorage.removeItem("loggedNoteappUser")
   }

   if (data == null) {
      return <div>loading data...</div>
   }

   return (
      <>
         <Messages />
         {user === null ? (
            <>
               <h2>Log in to application</h2>
               <form onSubmit={handleLogin}>
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
         ) : (
            <Router>
               <div>
                  <Link style={padding} to="/">
                     home
                  </Link>
                  <Link style={padding} to="/blogs">
                     notes
                  </Link>
                  <Link style={padding} to="/users">
                     users
                  </Link>
                  <span style={padding}>{user.name} logged in</span>
                  <button onClick={logOut}>Log out</button>
               </div>

               <h2>create new</h2>

               <Togglable buttonLabel="Add a blog..." ref={blogFormRef}>
                  <AddBlog createBlog={createBlog} />
               </Togglable>

               <Routes>
                  <Route
                     path="/blogs"
                     element={
                        <Blogs
                           data={data}
                           like={like}
                           remove={remove}
                           user={user}
                        />
                     }
                  />
               </Routes>
            </Router>
         )}
      </>
   )
}

export default App

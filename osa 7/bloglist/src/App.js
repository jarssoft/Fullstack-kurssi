import { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import Users from "./components/Users"
import User from "./components/User"
import Messages from "./components/Messages"

import blogService from "./services/blogs"
import loginService from "./services/login"
import { useMessageDispatch } from "./MessageContext"
import { useLoginContext } from "./LoginContext"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import "./index.css"
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Link,
   useNavigate,
} from "react-router-dom"

const App = ({ client }) => {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")

   const blogFormRef = useRef()
   const queryClient = useQueryClient()
   const navigate = useNavigate()

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
         navigate("/")
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
      navigate("/")
   }

   const logOut = () => {
      loginDispatch({ type: "LOGOUT" })
      window.localStorage.removeItem("loggedNoteappUser")

      navigate("/")
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
            <>
               <div>
                  <Link style={padding} to="/">
                     home
                  </Link>
                  <Link style={padding} to="/blogs">
                     blogs
                  </Link>
                  <Link style={padding} to="/users">
                     users
                  </Link>
                  <span style={padding}>{user.name} logged in</span>
                  <button onClick={logOut}>Log out</button>
               </div>

               <Routes>
                  <Route
                     path="/blogs"
                     element={
                        <Blogs
                           data={data}
                           like={like}
                           remove={remove}
                           user={user}
                           createBlog={createBlog}
                           blogFormRef={blogFormRef}
                        />
                     }
                  />
                  <Route
                     path="/"
                     element={
                        <Blogs
                           data={data}
                           like={like}
                           remove={remove}
                           user={user}
                           createBlog={createBlog}
                           blogFormRef={blogFormRef}
                        />
                     }
                  />
                  <Route
                     path="/users"
                     element={
                        <Users
                           data={data}
                           like={like}
                           remove={remove}
                           user={user}
                        />
                     }
                  />
                  <Route
                     path="/blogs/:id"
                     element={
                        <Blog
                           data={data}
                           like={like}
                           remove={remove}
                           user={user}
                        />
                     }
                  />
                  <Route path="/users/:id" element={<User data={data} />} />
               </Routes>
            </>
         )}
      </>
   )
}

export default App

import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Messages from "./components/Messages"
import AddBlog from "./components/AddBlog"
import Togglable from "./components/Toggable"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import "./index.css"

const App = ({ client }) => {
   const [user, setUser] = useState(null)
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [errorMessage, setErrorMessage] = useState(null)
   const [noticeMessage, setNoticeMessage] = useState(null)

   const blogFormRef = useRef()
   const queryClient = useQueryClient()

   useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
      if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON)
         setUser(user)
         blogService.setToken(user.token)
      }
   }, [])

   const newNoteMutation = useMutation({
      mutationFn: blogService.create,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["blogs"] })
      },
   })

   const { data, refetch } = useQuery({
      queryKey: ["blogs"],
      queryFn: blogService.getAll,
   })

   if (data == null) {
      return <div>loading data...</div>
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
         setUser(user)
         setUsername("")
         setPassword("")
      } catch (exception) {
         setErrorMessage("wrong credentials")
         setTimeout(() => {
            setErrorMessage(null)
         }, 5000)
      }
   }

   const createBlog = async (blogObject) => {
      blogFormRef.current.toggleVisibility()

      blogObject.user = user

      //await blogService.create(blogObject)

      newNoteMutation.mutate({ ...blogObject, likes: 0 })

      console.log(blogObject)

      setNoticeMessage(
         `A new blog ${blogObject.title} by ${blogObject.author} added.`
      )
      setTimeout(() => {
         setNoticeMessage(null)
      }, 5000)

      //lataa uudestaan
      //blogs = await blogService.getAll()
      //console.log(blogs)
      //setBlogs(blogs)
   }

   const like = (id) => {
      const newblogs = data.map((blog) => {
         if (blog.id === id) {
            console.log(`like ${blog.title}`)
            blog.likes += 1
            blogService.put(blog)
         }
         return blog
      })
      refetch()
   }

   const remove = async (id) => {
      const newblogs = data.filter((blog) => {
         if (blog.id === id) {
            console.log(`remove ${blog.title}`)
            blogService.remove(blog)
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
      setUser(null)
      window.localStorage.removeItem("loggedNoteappUser")
   }

   if (user === null) {
      return (
         <div>
            <Messages error={errorMessage} notice={noticeMessage} />

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
         </div>
      )
   }

   return (
      <div>
         <Messages error={errorMessage} notice={noticeMessage} />

         <p>{user.name} logged in</p>
         <button onClick={logOut}>Log out</button>

         <h2>create new</h2>

         <Togglable buttonLabel="Add a blog..." ref={blogFormRef}>
            <AddBlog createBlog={createBlog} />
         </Togglable>

         <h2>blogs</h2>

         {data
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
               <Blog
                  key={blog.id}
                  blog={blog}
                  like={like}
                  remove={user.username === blog.user.username ? remove : null}
               />
            ))}
      </div>
   )
}

export default App

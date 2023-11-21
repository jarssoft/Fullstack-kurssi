import { useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import Users from "./components/Users"
import User from "./components/User"
import Login from "./components/Login"
import Messages from "./components/Messages"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { useMessageDispatch } from "./MessageContext"
import { useLoginContext } from "./LoginContext"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
   Routes,
   Route,
   Link as RouterLink,
   useNavigate,
} from "react-router-dom"
import "./index.css"
import { Container, Toolbar, Link } from "@mui/material"

const App = ({ client }) => {
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

   const { data: blogs, refetch } = useQuery({
      queryKey: ["blogs"],
      queryFn: blogService.getAll,
   })

   const messageDispatch = useMessageDispatch()
   const [user, loginDispatch] = useLoginContext()

   const logIn = async (username, password) => {
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

   const createComment = async (id, newComment) => {
      console.log(id, newComment)
      await blogService.createComment(id, {
         comment: newComment,
      })

      messageDispatch({
         type: "NTC",
         payload: `A new comment added.`,
      })

      setTimeout(() => {
         messageDispatch({ type: "CLR" })
      }, 5000)
   }

   const like = (id) => {
      blogs.forEach((blog) => {
         if (blog.id === id) {
            console.log(`like ${blog.title}`)
            updateNoteMutation.mutate({ ...blog, likes: blog.likes + 1 })
         }
         return blog
      })
   }

   const remove = async (id) => {
      const newblogs = blogs.filter((blog) => {
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
      navigate("/")
   }

   const logOut = () => {
      loginDispatch({ type: "LOGOUT" })
      window.localStorage.removeItem("loggedNoteappUser")
      navigate("/")
   }

   return (
      <Container>
         <Messages />
         {user === null ? (
            <Login handleLogin={logIn} />
         ) : (
            <>
               <Toolbar>
                  <Link
                     style={{ padding: "0px 20px" }}
                     component={RouterLink}
                     to="/blogs"
                  >
                     blogs
                  </Link>
                  |
                  <Link
                     style={{ padding: "0px 20px" }}
                     component={RouterLink}
                     to="/users"
                  >
                     users
                  </Link>
                  |
                  <span style={{ padding: "0px 20px" }}>
                     {user.name} logged in
                     <button onClick={logOut}>Log out</button>
                  </span>
               </Toolbar>

               {blogs == null ? (
                  <div style={{ padding: "0px 20px" }}>loading data...</div>
               ) : (
                  <Routes>
                     <Route
                        path="/blogs"
                        element={
                           <Blogs
                              blogs={blogs}
                              createBlog={createBlog}
                              blogFormRef={blogFormRef}
                           />
                        }
                     />
                     <Route
                        path="/"
                        element={
                           <Blogs
                              blogs={blogs}
                              createBlog={createBlog}
                              blogFormRef={blogFormRef}
                           />
                        }
                     />
                     <Route path="/users" element={<Users data={blogs} />} />
                     <Route
                        path="/blogs/:id"
                        element={
                           <Blog
                              blogs={blogs}
                              like={like}
                              remove={remove}
                              user={user}
                              createComment={createComment}
                           />
                        }
                     />
                     <Route path="/users/:id" element={<User data={blogs} />} />
                  </Routes>
               )}
            </>
         )}
      </Container>
   )
}

export default App

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Messages from './components/Messages'
import AddBlog from './components/AddBlog'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [noticeMessage, setNoticeMessage] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))       

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const createBlog = async (blogObject) => {
  
    blogObject.user=user
    await blogService.create(blogObject)

    console.log(blogObject)

    //lataa uudestaan
    const blogs = await blogService.getAll()
    console.log(blogs)
    setBlogs(blogs)
    
    noteFormRef.current.toggleVisibility()
    setNoticeMessage(`A new blog ${blogObject.name} by ${blogObject.BlogAuthor} added.`)
    setTimeout(() => {setNoticeMessage(null)}, 5000)

  }

  const like = (id) => {
    let copyofblogs = blogs.map(blog => {
      if(blog.id === id){
        console.log(`like ${blog.title}`)
        blog.likes += 1
        blogService.put(blog)
      }
      return blog
    })
    setBlogs(copyofblogs)
  }

  const remove = (id) => {
    let copyofblogs = blogs.filter(blog => {
      if(blog.id === id){
        console.log(`remove ${blog.title}`)
        blogService.remove(blog)
        return false
      }else{
        return true
      }
    })
    setBlogs(copyofblogs)
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
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
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>

      <Messages error={errorMessage} notice={noticeMessage} />

      <p>{user.name} logged in</p>
      <button onClick={logOut}>
        Log out
      </button>

      <h2>create new</h2>

      <Togglable buttonLabel='Add a blog...' ref={noteFormRef}>
        <AddBlog createBlog={createBlog} />
      </Togglable>

      <h2>blogs</h2>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) =>
          <Blog
            key = {blog.id}
            blog = {blog}
            like = {like}
            remove = {user.username === blog.user.username ? remove : null}
          />,
        )}

    </div>
  )
}

export default App
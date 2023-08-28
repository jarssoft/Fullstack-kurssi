//import { useState } from 'react'

const Blog = ({blog, toggleview, like, remove}) => {

  //const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const Poistonappi = () => (
    remove ? <button onClick={() => remove(blog.id)}>Poista</button> : <></>
  )

  const Lisatieto = () => (
    (blog.view 
    ? <>
        <button onClick={() => toggleview(blog.id)}>Piilota</button>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>likes {blog.likes} <button onClick={() => like(blog.id)}>Like</button></div>
        <div>{blog.user.name}</div>
        <Poistonappi />
      </> 
    : <button onClick={() => toggleview(blog.id)}>Näytä</button>)    
  )

  return(
    <div style={blogStyle}>
      {blog.title} <Lisatieto/>
    </div>
  )

}

export default Blog
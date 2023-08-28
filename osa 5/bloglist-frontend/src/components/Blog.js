//import { useState } from 'react'

const Blog = ({blog, toggleview}) => {

  //const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const Lisatieto = () => (
    (blog.view 
    ? <>
        <button onClick={() => toggleview(blog.id)}>Piilota</button>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.user.name}</div>        
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
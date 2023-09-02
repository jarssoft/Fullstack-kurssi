import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({blog, like, remove}) => {

  const [viewable, setViewable] = useState(false)
    
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

  const toggleview = () => {
    setViewable(!viewable)
  }

  const Lisatieto = () => (
    (viewable
      ? <>
        <button onClick={() => toggleview()}>Piilota</button>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>likes {blog.likes} <button onClick={() => like(blog.id)}>Like</button></div>
        <div>{blog.user.name}</div>
        <Poistonappi />
      </> 
      : <button onClick={() => toggleview()}>Näytä</button>)    
  )

  return(
    <div style={blogStyle}>
      {blog.title} <Lisatieto/>
    </div>
  )

}

Blog.propTypes = {
  blog: PropTypes.object,
  like: PropTypes.func,
  remove: PropTypes.func,
}

export default Blog
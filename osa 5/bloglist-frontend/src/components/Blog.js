import PropTypes from 'prop-types'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const Blog = ({blog, like, remove}) => {

  const [viewable, setViewable] = useState([])
    
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

  const toggleview = (id) => {
    let newviewable=[]
    if(viewable.includes(id)){
      newviewable = viewable.filter(item => item !== id)
    }else{
      newviewable=viewable.concat([id])
    }
    console.log(newviewable)
    setViewable(newviewable)
  }

  const Lisatieto = () => (
    (viewable.includes(blog.id)
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

Blog.propTypes = {
  blog: PropTypes.func,
}


export default Blog
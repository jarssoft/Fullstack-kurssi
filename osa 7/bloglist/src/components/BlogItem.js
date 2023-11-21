import {
   BrowserRouter as Router,
   Routes,
   Route,
   Link as RouterLink,
} from "react-router-dom"
import PropTypes from "prop-types"
import { useState } from "react"
import { Container, Toolbar, AppBar, Link } from "@mui/material"

const Blog = ({ blog, like, remove }) => {
   const [viewable, setViewable] = useState(false)

   const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5,
      borderColor: "green",
   }

   const toggleview = () => {
      setViewable(!viewable)
   }

   const Lisatieto = () => (
      <>
         <div>
            <Link component={RouterLink} to={`/blogs/${blog.id}`}>
               {blog.title}
            </Link>
         </div>
      </>
   )

   return (
      <div style={blogStyle}>
         <Lisatieto />
      </div>
   )
}

Blog.propTypes = {
   blog: PropTypes.object,
   like: PropTypes.func,
   remove: PropTypes.func,
}

export default Blog

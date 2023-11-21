import {
   BrowserRouter as Router,
   Routes,
   Route,
   Link as RouterLink,
   useParams,
} from "react-router-dom"
import AddComment from "./AddComment"
import "../index.css"
import { Container, Toolbar, AppBar, Link } from "@mui/material"

const Blog = ({ data, like, remove, user, createComment }) => {
   const id = useParams().id

   let users = {}
   const blog = data.filter((blog) => blog.id == id)[0]
   remove = user.username === blog.user.username ? remove : null

   const Poistonappi = () =>
      remove ? <button onClick={() => remove(blog.id)}>Poista</button> : <></>

   return (
      <>
         <>
            <h1>{blog.title}</h1>

            <div style={{ padding: "20px 0px" }}>
               <Link component={RouterLink} to={blog.url}>
                  {blog.url}
               </Link>
            </div>

            <div>
               likes <b id="likes">{blog.likes}</b>{" "}
               <button onClick={() => like(blog.id)}>Like</button>
            </div>

            <div>
               added by {blog.user.name} <Poistonappi />
            </div>

            <h2>comments</h2>
            <AddComment blog={blog} createComment={createComment} />
         </>
      </>
   )
}

export default Blog

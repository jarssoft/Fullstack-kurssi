import {
   BrowserRouter as Router,
   Routes,
   Route,
   Link,
   useParams,
} from "react-router-dom"

const Blog = ({ data, like, remove, user }) => {
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

            <div>
               likes <b id="likes">{blog.likes}</b>{" "}
               <button onClick={() => like(blog.id)}>Like</button>
            </div>
            <div>{blog.user.name}</div>
            <Poistonappi />
         </>
      </>
   )
}

export default Blog

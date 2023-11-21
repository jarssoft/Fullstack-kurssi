import Blog from "./BlogItem"
import AddBlog from "./AddBlog"
import Togglable from "./Toggable"

const Blogs = ({ data, like, user, remove, createBlog, blogFormRef }) => {
   return (
      <>
         <h2>blogs</h2>

         <div style={{ padding: "20px 0px" }}>
            <Togglable buttonLabel="Add a blog..." ref={blogFormRef}>
               <AddBlog createBlog={createBlog} />
            </Togglable>
         </div>

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
      </>
   )
}

export default Blogs

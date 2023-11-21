import BlogItem from "./BlogItem"
import AddBlog from "./AddBlog"
import Togglable from "./Toggable"

const Blogs = ({ blogs, createBlog, blogFormRef }) => {
   return (
      <>
         <h2>blogs</h2>

         <div style={{ padding: "20px 0px" }}>
            <Togglable buttonLabel="Add a blog..." ref={blogFormRef}>
               <AddBlog createBlog={createBlog} />
            </Togglable>
         </div>

         {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
               <BlogItem key={blog.id} blog={blog} />
            ))}
      </>
   )
}

export default Blogs

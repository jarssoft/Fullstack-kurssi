import Blog from "./Blog"

const Blogs = ({ data, like, user, remove }) => (
   <>
      <h2>blogs</h2>

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

export default Blogs

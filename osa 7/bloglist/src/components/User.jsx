import { useParams } from "react-router-dom"

const User = ({ data }) => {
   const username = useParams().id

   let users = {}

   return (
      <>
         <h2>{username}</h2>
         <p>Added blogs:</p>
         <ul>
            {data
               .filter((blog) => blog.user.username == username)
               .map((blog) => (
                  <li key={blog.id}>{blog.title}</li>
               ))}
         </ul>
      </>
   )
}

export default User

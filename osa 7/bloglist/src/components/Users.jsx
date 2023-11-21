import { Link as RouterLink } from "react-router-dom"
import { Link } from "@mui/material"

const Users = ({ data }) => {
   let users = {}

   data.forEach((blog) => {
      if (blog.user.username in users) {
         users[blog.user.username] += 1
      } else {
         users[blog.user.username] = 1
      }
   })

   console.log(users)
   return (
      <>
         <h2>users</h2>
         <p>Users and count of blogs.</p>
         {Object.keys(users).map((user) => (
            <p key={user}>
               <Link component={RouterLink} to={`/users/${user}`}>
                  {user}
               </Link>
               : {users[user]}
            </p>
         ))}
      </>
   )
}

export default Users

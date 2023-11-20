const Users = ({ data, like, user, remove }) => {
   let users = {}

   data.forEach((blog) => {
      if (blog.user.username in users) {
         users[blog.user.username] += 1
      } else {
         users[blog.user.username] = 0
      }
   })

   console.log(users)
   return (
      <>
         <h2>users</h2>
         <p>Users and count of blogs.</p>
         {Object.keys(users).map((user) => (
            <p key={user}>
               {user}: {users[user]}
            </p>
         ))}
      </>
   )
}

export default Users

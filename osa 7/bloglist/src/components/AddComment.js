import { useState, useEffect } from "react"

const AddComment = ({ createComment, blog }) => {
   const [comment, setComment] = useState("")
   const [allComments, setAllComments] = useState([])

   useEffect(() => {
      setAllComments(blog.comments)
   }, [blog])

   const addComment = (event) => {
      event.preventDefault()
      createComment(blog.id, comment)
      setAllComments([comment].concat(allComments))
      setComment("")
   }

   return (
      <>
         <form onSubmit={addComment}>
            <div>
               add comment:
               <input
                  value={comment}
                  onChange={({ target }) => setComment(target.value)}
                  placeholder="a new comment"
                  id="comment"
               />
               <button type="submit" id="submit">
                  save
               </button>
            </div>
         </form>
         {blog.comments ? (
            <div>
               <ul>
                  {allComments.map((comment, i) => (
                     <li key={i}>{comment}</li>
                  ))}
               </ul>
            </div>
         ) : (
            <p></p>
         )}
      </>
   )
}

export default AddComment

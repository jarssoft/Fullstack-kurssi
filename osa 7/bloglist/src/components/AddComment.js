import { useState } from "react"

const AddComment = ({ createComment }) => {
   const [comment, setComment] = useState("")

   const addComment = (event) => {
      event.preventDefault()
      createComment({
         comment: comment,
      })

      setComment("")
   }

   return (
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
   )
}

export default AddComment

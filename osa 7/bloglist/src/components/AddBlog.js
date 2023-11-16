import { useState } from "react"
import PropTypes from "prop-types"

const AddBlog = ({ createBlog }) => {
   const [BlogName, setBlogName] = useState("")

   const [BlogURL, setBlogURL] = useState("")
   const [BlogAuthor, setBlogAuthor] = useState("")

   const addBlog = (event) => {
      event.preventDefault()
      createBlog({
         title: BlogName,
         author: BlogAuthor,
         url: BlogURL,
         likes: 0,
      })

      setBlogName("")
      setBlogAuthor("")
      setBlogURL("")
   }

   return (
      <form onSubmit={addBlog}>
         <div>
            title:
            <input
               value={BlogName}
               onChange={({ target }) => setBlogName(target.value)}
               placeholder="a new title"
               id="title"
            />
         </div>
         <div>
            author:
            <input
               value={BlogAuthor}
               onChange={({ target }) => setBlogAuthor(target.value)}
               id="author"
            />
         </div>
         <div>
            url:
            <input
               value={BlogURL}
               onChange={({ target }) => setBlogURL(target.value)}
               id="url"
            />
         </div>
         <button type="submit" id="submit">
            save
         </button>
      </form>
   )
}

AddBlog.propTypes = {
   createBlog: PropTypes.func,
}

export default AddBlog

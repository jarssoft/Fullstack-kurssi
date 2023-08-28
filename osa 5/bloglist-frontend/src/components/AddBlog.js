import { useState } from 'react'

const AddBlog = ({
    createBlog
   }) => {

    const [BlogName, setBlogName] = useState('')
    const [BlogURL, setBlogURL] = useState('')
    const [BlogAuthor, setBlogAuthor] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog(
        {
          title: BlogName,
          author: BlogAuthor,
          url: BlogURL,
          likes: 0,
          //user: user
        })
      
        setBlogName('')
        setBlogAuthor('')
        setBlogURL('')     
      }
  
   return (
    <form onSubmit={addBlog}>
        <div>
        title:
        <input
        value={BlogName}
        onChange={({ target }) => setBlogName(target.value)}
        />
        </div>
        <div>
        author:
        <input
        value={BlogAuthor}
        onChange={({ target }) => setBlogAuthor(target.value)}
        />
        </div>
        <div>
        url:
        <input
        value={BlogURL}
        onChange={({ target }) => setBlogURL(target.value)}
        />
        </div>
        <button type="submit">save</button>
     </form>
    )
}

export default AddBlog
const AddBlog = ({
    addBlog,
    BlogName,
    BlogAuthor,
    BlogURL,
    setBlogName,
    setBlogAuthor,
    setBlogURL
   }) => {

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
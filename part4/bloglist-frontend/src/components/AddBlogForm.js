import { useState } from 'react'

const AddBlogForm = ({addBlog}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()
    let newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    try {
      addBlog(newBlog)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch(exception) {
      console.log('vituiks')
    }
  }

  return (
    <form onSubmit={handleAddBlog}>
      <div>
        <label>title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AddBlogForm
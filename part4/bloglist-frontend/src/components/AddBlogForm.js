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
          title:
            <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form> 
    )
  }

export default AddBlogForm
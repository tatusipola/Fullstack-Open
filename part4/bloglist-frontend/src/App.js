import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('bad creds')
      setMessage('bad credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleAddLike = (blog) => {
    //mutating argument probably not the best way
    blog.likes += 1
    const updatedBlog = blogService.addLike(blog)
    setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)).sort((a,b) => b.likes - a.likes))
  }

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(returnedBlog).sort((a,b) => b.likes - a.likes))
    setMessage(`${returnedBlog.title} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deleteBlog = async (blogObject) => {
    await blogService.deleteBlog(blogObject)
    setBlogs(blogs.filter(blog => blog !== blogObject))
    setMessage(`${blogObject.title} deleted`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <Notification message={message} />
      <p>
        {user.username} is logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h3>Add new blog</h3>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <AddBlogForm addBlog={addBlog}/>
      </Togglable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleAddLike={handleAddLike} deleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )
}

export default App

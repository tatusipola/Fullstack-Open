import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showDetails) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} 
          <button onClick={() => setShowDetails(false)}>hide details</button><br></br>
          {blog.url} <br></br>
          likes: {blog.likes} 
          <button>like</button><br></br>
          {blog.user ? blog.user.name : ''}
        </div>
      </div>
    )
  }

  return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} 
          <button onClick={() => setShowDetails(true)}>show details</button><br></br>
        </div>
      </div>
    )


}

export default Blog
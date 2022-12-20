import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import '@testing-library/jest-dom'

describe('Blog component', () => {
  let blog
  let handleAddLike
  let deleteBlog
  let user

  beforeEach(() => {
    blog = {
      title: 'Blog Title',
      author: 'Blog Author',
      url: 'https://blog.com',
      likes: 10,
      user: { name: 'User Name' }
    }
    handleAddLike = jest.fn()
    deleteBlog = jest.fn()
    user = { name: 'User Name' }
  })

  test('renders title and author, but not url or likes by default', () => {
    render(
      <Blog blog={blog} handleAddLike={handleAddLike} deleteBlog={deleteBlog} user={user} />
    )

    const title = screen.getByText(blog.title, {exact: false})
    const author = screen.getByText(blog.author, {exact: false})
    expect(title).toBeDefined()
    expect(author).toBeDefined()

    // Assert that the url and likes are not rendered by default
    expect(() => screen.getByText(blog.url)).toThrow()
    expect(() => screen.getByText(`likes: ${blog.likes}`)).toThrow()
  })

  test('shows url and likes when details button is clicked', () => {
    const { getByText } = render(
      <Blog blog={blog} handleAddLike={handleAddLike} deleteBlog={deleteBlog} user={user} />
    )

    const detailsButton = getByText('show details')
    fireEvent.click(detailsButton)

    const url = getByText(blog.url, {exact: false})
    const likes = getByText(`likes: ${blog.likes}`, {exact: false})
    expect(url).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
  })

  test('calls handleAddLike event handler when like button is clicked', () => {
    const { getByText } = render(
      <Blog blog={blog} handleAddLike={handleAddLike} deleteBlog={deleteBlog} user={user} />
    )

    const detailsButton = getByText('show details')
    fireEvent.click(detailsButton)

    const likeButton = getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleAddLike).toHaveBeenCalledTimes(2)

  })
})






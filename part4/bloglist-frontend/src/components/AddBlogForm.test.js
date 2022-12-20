import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

describe('AddBlogForm component', () => {
  let addBlog

  beforeEach(() => {
    addBlog = jest.fn()
  })

  test('calls addBlog with the right details when form is submitted', () => {
    const { getByLabelText, getByText } = render(
      <AddBlogForm addBlog={addBlog} />
    )

    const titleInput = getByLabelText('title:')
    const authorInput = getByLabelText('author:')
    const urlInput = getByLabelText('url:')
    const submitButton = getByText('create')

    fireEvent.change(titleInput, { target: { value: 'Blog Title' } })
    fireEvent.change(authorInput, { target: { value: 'Blog Author' } })
    fireEvent.change(urlInput, { target: { value: 'https://blog.com' } })
    fireEvent.click(submitButton)

    expect(addBlog).toHaveBeenCalledWith({
      title: 'Blog Title',
      author: 'Blog Author',
      url: 'https://blog.com'
    })
  })
})
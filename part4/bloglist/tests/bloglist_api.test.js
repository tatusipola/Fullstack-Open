const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/bloglist')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/bloglist')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('identifier property is named id', async () => {
    const response = await api.get('/api/bloglist')

    expect(response.body[0].id).toBeDefined
})

test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'AKAFSDJ',
      url: 'ASDKLDSKSDA.com',
      likes: 16
    }
  
    await api
      .post('/api/bloglist')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/bloglist')
  
    const title = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(title).toContain(
      'test blog'
    )
  })

test('adding blog with missing likes defaults to 0', async () => {
    const newBlog = {
      title: 'test blog likes missing',
      author: 'AKAFSDJ',
      url: 'ASDKLDSKSDA.com'
    }
  
    await api
      .post('/api/bloglist')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/bloglist')
  
    const likes = response.body.map(r => r.likes)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    console.log(likes)
    expect(likes[likes.length-1]).toBe(0)
})

test('adding blog with missing title or url returns status 400', async () => {
    let newBlog = {
      author: 'AKAFSDJ',
      url: 'ASDKLDSKSDA.com',
      likes: 13
    }
  
    await api
      .post('/api/bloglist')
      .send(newBlog)
      .expect(400)
})

test('deleting a blog works', async () => {
    const blogToDelete = initialBlogs[0]
    await api
      .delete(`/api/bloglist/${blogToDelete._id}`)
      .expect(204)

    const response = await api.get('/api/bloglist')
    expect(response.body).toHaveLength(initialBlogs.length - 1)

    const titles = response.body.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('updating a blog works', async () => {
    let blogToUpdate = initialBlogs[0]
    blogToUpdate.likes = 16

    const response = await api.put(`/api/bloglist/${blogToUpdate._id}`).send(blogToUpdate)

    expect(response.body.likes).toBe(blogToUpdate.likes)
})


afterAll(() => {
  mongoose.connection.close()
})
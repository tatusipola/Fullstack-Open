const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const config = require('./utils/config')
const bloglistRouter = require('./controllers/bloglist')
const usersRouter = require('./controllers/users')


mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/bloglist', bloglistRouter)
app.use('/api/users', usersRouter)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
  
    console.log("oma post-metodi");

    try{
      await blog.save()
      response.status(201).json(result)
    } catch(exception) {
      next(exception)
    }

  })
  
  module.exports = blogsRouter
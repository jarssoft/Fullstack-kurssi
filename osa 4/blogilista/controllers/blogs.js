const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    
  try{
      let blogs = await Blog.find({})
      response.json(blogs)
    } catch(exception) {
      next(exception)
    }

  })
  
blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
  
    console.log("oma post-metodi");

    try{
      const savedNote = await blog.save()
      response.status(201).json(savedNote)
    } catch(exception) {
      next(exception)
    }

  })

  blogsRouter.delete('/:id', async (request, response, next) => {

    console.log("oma delete-metodi");

    try{
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch(exception) {
      next(exception)
    }

  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body;
  
    const person = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }
    
    try{
      await Blog.findByIdAndUpdate(request.params.id, person, {new: true})
      response.status(204).end()
    } catch(exception) {
      next(exception)
    }


  });
  
  module.exports = blogsRouter
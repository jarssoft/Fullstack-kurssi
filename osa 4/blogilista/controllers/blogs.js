const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
   
  try{
      let blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
      response.json(blogs)
    } catch(exception) {
      next(exception)
    }

  })
  
const getTokenFrom = request => {
    const authorization = request.get('authorization') 
    if (authorization && authorization.startsWith('Bearer ')) {
          return authorization.replace('Bearer ', '')  
    }  return null
  }

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  //blog.user="646a81cdca9e9b3949a50474"

  //console.log("oma post-metodi");
  //let user = (await User.find({}))[0]

  try{
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    console.log(request.token);
 
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })  
    }  
    const user = await User.findById(decodedToken.id)

    blog.user = user.toJSON().id
    

    const saved = await blog.save()      
    console.log(saved);
    
    user.blogs = user.blogs.concat(saved.id)
    console.log(user);
    
    await user.save()
    response.status(201).json(saved)
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
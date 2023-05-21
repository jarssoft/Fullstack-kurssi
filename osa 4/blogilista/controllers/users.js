const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    
  console.log("oma get-metodi");


  try{
      let users = await User.find({})
      response.json(users)
  } catch(exception) {
    next(exception)
  }

  })
  
usersRouter.post('/', async (request, response, next) => { 
    const user = new User(request.body)
  
    console.log("oma post-metodi");

    try{
      const savedUser = await user.save()
      response.status(201).json(savedUser)
    } catch(exception) {
      next(exception)
    }

  })
 
  module.exports = usersRouter
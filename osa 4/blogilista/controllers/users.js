const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    
  console.log("oma get-metodi");

  try{
    let users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users)
  } catch(exception) {
    next(exception)
  }

  })
  
usersRouter.post('/', async (request, response, next) => { 
  //const user = new User(request.body)

  const { username, name, password } = request.body

  if (username === undefined || password === undefined) {
    return response.status(400).json({ error: 'content missing' })  
  }

  if (password.length < 3) {
    return response.status(400).json({ error: 'too short password' })  
  }
  
  try{
    let users = await User.find({})
    const usernames = users.filter(r => r.username == username)
    console.log(usernames)
    if (usernames.length > 0) {
      return response.status(400).json({ error: 'username already exists' })  
    }
  } catch(exception) {
    next(exception)
  }
    /*
    //testaa, että username on 
    {
      const response = await api.get('/api/users')
      const usernames = response.body.map(r => r.name)
      console.log(usernames);
    }
    */
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })

    console.log("oma post-metodi");

    try{
      const savedUser = await user.save()
      response.status(201).json(savedUser)
    } catch(exception) {
      next(exception)
    }

  })
 
  module.exports = usersRouter
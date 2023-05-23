const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const initialUser =
  {
    name: 'Jari',
    username: "jzray",
    passwordHash: 'asd'
  }

beforeEach(async () => {
  await User.deleteMany({})
  let noteObject = new User(initialUser)
  await noteObject.save()
})

test('users can be added', async () => {

  const newUser = {
    name: 'Jari',
    username: "jzray",
    password: 'asd'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(1+1)
});

test('users without password cannot be added', async () => {

  const newUser = {
    name: 'Jari',
    username: "jzray",
    //password: 'asd'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(1)
});

test('users without username cannot be added', async () => {

  const newUser = {
    name: 'Jari',
    //username: "jzray",
    password: 'asd'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(1)
});

test('users with too short password cannot be added', async () => {

  const newUser = {
    name: 'Jari',
    username: "jzray",
    password: 'as'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(1)
});


afterAll(async () => {
  await mongoose.connection.close()
})


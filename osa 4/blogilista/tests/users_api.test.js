const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUser =
  {
    name: 'Jari',
    username: "jzray",
    passwordHash: '$2b$10$oK523bNpfk.akn2QQapyPeeZ4peziExug8.I7qDVuR4wUFnPu6ooC'
  }

beforeEach(async () => {
  await User.deleteMany({})
  let noteObject = new User(initialUser)
  await noteObject.save()
})

test('users can be added', async () => {

  const newUser = {
    name: 'Jari',
    username: "jzray2",
    password: 'asd'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(1+1)
});

test('username must be unique', async () => {

  const newUser = {
    name: 'Jari',
    username: "jzray",
    password: 'asd'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('username already exists')

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(1)
});

test('users without password cannot be added', async () => {

  const newUser = {
    name: 'Jari',
    username: "jzray",
    //password: 'asd'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('content missing')

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(1)
});

test('users without username cannot be added', async () => {

  const newUser = {
    name: 'Jari',
    //username: "jzray",
    password: 'asd'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('content missing')

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(1)
});

test('users with too short password cannot be added', async () => {

  const newUser = {
    name: 'Jari',
    username: "jzray",
    password: 'as'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('too short password')

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(1)
});


afterAll(async () => {
  await mongoose.connection.close()
})
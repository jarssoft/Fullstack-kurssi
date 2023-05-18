const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Pallopanoraamablogi',
    author: "Janne",
    url: 'pallopanoraamablogi.blogspot.com',
    likes: 1,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are one blog', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(1)
})

test('there is id for identification', async () => {
  const response = await api.get('/api/blogs')
  
  console.log(response.body[0].id);
  expect(response.body[0].id).toBeDefined();
});

test('blogs can be added', async () => {
  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length+1)
});

test('likes is sets 0 as default', async () => {

  const undefinedlikes = {
    title: 'Pallopanoraamablogi',
    author: "Janne",
    url: 'pallopanoraamablogi.blogspot.com',
    //likes: 3,
  }

  let noteObject = new Blog(undefinedlikes)
  const response = await noteObject.save()

  console.log(response);
  expect(response.likes).toBeDefined();
  expect(response.likes).toEqual(0);
});

afterAll(async () => {
  await mongoose.connection.close()
})
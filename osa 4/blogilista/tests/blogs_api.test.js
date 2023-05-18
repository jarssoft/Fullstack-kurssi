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

test('there is one blog', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(1)
})

test('there is id for identification', async () => {
  const response = await api.get('/api/blogs')
  
  console.log(response.body[0].id);
  expect(response.body[0].id).toBeDefined();
});

test('blogs can be added', async () => {

  let noteObject = initialBlogs[0]

  await api
  .post('/api/blogs')
  .send(noteObject)
  .expect(201)

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

  const response = await api
      .post('/api/blogs')
      .send(undefinedlikes)
      .expect(201)
  
  console.log(response);
  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toEqual(0);
});

test('blogs with empty title gives 400 Bad Request', async () => {

  
  const undefinedtitle = {
    //title: 'Pallopanoraamablogi',
    author: "Janne",
    url: 'pallopanoraamablogi.blogspot.com',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(undefinedtitle)
    .expect(400)

  console.log('note saved!')

  })
  

test('blogs with empty url gives 400 Bad Request', async () => {

  const undefinedtitle = {
    title: 'Pallopanoraamablogi',
    author: "Janne",
    //url: 'pallopanoraamablogi.blogspot.com',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(undefinedtitle)
    .expect(400)
  })

  test('blogs can be deleted', async () => {

    const response = await api.get('/api/blogs')
      
    const id = response.body[0].id
    console.log(id);

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length-1)
    }

    })

afterAll(async () => {
  await mongoose.connection.close()
})


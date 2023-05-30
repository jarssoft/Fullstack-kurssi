const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token = "";
let user = "";

beforeAll(async () => {
  await User.deleteMany({})

  const newUser = {
    name: 'Jari',
    username: "jzray",
    password: 'asd'
  }

  //luodaan käyttäjä
  const userresponse = await api
    .post('/api/users')
    .send(newUser)

  let creater = await User.find({})
  user = creater[0]._id
  console.log(user);

  const username = {
    username: "jzray",
    password: "asd"
  }

  //ladataan token
  const response = await api
    .post('/api/login')
    .send(username)

  token=response.body.token
});

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

  //const creater = await User.findById({})
  
  const initialBlog = 
  {
    title: 'Testiblogi',
    author: "Testaaja",
    url: 'testaus.blogspot.com',
    likes: 10,
    user: user
  }
  
  let noteObject = new Blog(initialBlog)
  //console.log(creater);
  console.log(noteObject);
  //noteObject.user=creater
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
  .set('Authorization', `Bearer ${token}`)
  .send(noteObject)
  .expect(201)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length+1)
});

test('blogs cannot be added without token', async () => {

  let noteObject = initialBlogs[0]

  await api
  .post('/api/blogs')
  .send(noteObject)
  .expect(401)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
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
      .set('Authorization', `Bearer ${token}`)
      .send(undefinedlikes)
      .expect(201)
  
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
    .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .send(undefinedtitle)
    .expect(400)
  })

  test('blogs can be deleted', async () => {

    //haetaan ensimmäisen id
    const response = await api.get('/api/blogs')      
    const id = response.body[0].id
    console.log(id);

    //poistetaan
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    //tarkistetaan, jotta blogit ovat vähentyneet
    {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length-1)
    }

  })

  test('blogs can be modified', async () => {

    //haetaan ensimmäinen blogi ja otetan id sekä likes
    const response1 = await api.get('/api/blogs')      
    const id = response1.body[0].id
    const likes = response1.body[0].likes
    console.log(id);

    //putataan id:lle uusi, mutta nostetaan likejen määrää yhdellä
    const undefinedtitle = {
      title: 'Pallopanoraamablogi',
      author: "Janne",
      url: 'pallopanoraamablogi.blogspot.com',
      likes: likes + 1,
    }        
    const response = await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(undefinedtitle)
      .expect(204)        

    //tarkistetaan että likes on muuttunut
    const response2 = await api.get('/api/blogs')
    expect(response2.body).toHaveLength(initialBlogs.length)
    expect(likes === response2.body[0].likes)
    console.log(response2.body[0].likes);

  })
  

afterAll(async () => {
  await mongoose.connection.close()
})


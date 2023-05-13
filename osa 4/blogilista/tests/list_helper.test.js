const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {


  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(29)
  })

  test('kun tyhjä lista, arvo on 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('kun tuhat kertaa sama blogi, palauttaa 1000-kertaisena', () => {
    const result = listHelper.totalLikes(Array(1000).fill(listWithOneBlog[0]))
    expect(result).toBe(1000*5)
  })

})

describe('favoriteBlog', () => {

  test('suurin määrä on 12', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result.likes).toBe(12)
  })

  test('jos vain yksi, arvon likes on listan ainoan alkion like-määrä', () => {
    const result = listHelper.favoriteBlog([listWithOneBlog[0]])
    expect(result.likes).toBe(5)
  })

  test('jos tyhjä lista, arvo on undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

})
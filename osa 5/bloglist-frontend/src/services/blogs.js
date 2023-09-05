import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {

  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const url = `/api/blogs/${newObject.id}`
  const response = await axios.put(url, newObject, config)
  return response.data
}

const remove = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const url = `/api/blogs/${newObject.id}`
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, setToken, put, remove }
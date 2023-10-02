import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const url = baseUrl+"/"+id
  let response = await axios.get(url)
  const data = response.data
  const object = { ...data, votes: response.data.votes+1 }
  await axios.put(url, object)
  //console.log(response.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, vote }
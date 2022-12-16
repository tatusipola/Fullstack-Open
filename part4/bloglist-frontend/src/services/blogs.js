import axios from 'axios'
const baseUrl = '/api/bloglist'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token},
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (blogObject) => {
  const res = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  return res.data
} 

export default { getAll, setToken, create, addLike }
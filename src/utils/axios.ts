import Axios, { AxiosInstance } from 'axios'

const baseURL = 'https://reqres.in/api/users?page=2'

const axios: AxiosInstance = Axios.create({
  baseURL,
  timeout: 20000
})

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

export default axios

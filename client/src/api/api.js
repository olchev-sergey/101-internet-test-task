import axios from 'axios'

const API_URL = 'http://localhost:4444/api'

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

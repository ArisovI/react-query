import axios from 'axios'

const BASE_URL = 'https://dummyjson.com/'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

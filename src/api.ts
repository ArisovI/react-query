import axios from 'axios'

const BASE_URL = 'https://api.escuelajs.co/api/v1/'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

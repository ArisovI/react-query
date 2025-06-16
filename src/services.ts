import { api } from './api'
import type { Products } from './types'

export async function getProducts() {
  const { data } = await api<{ todos: Products[] }>('todos')

  return data
}

export async function deleteProduct(id: number) {
  const { data } = await api.delete(`todos/${id}`)
  return data
}

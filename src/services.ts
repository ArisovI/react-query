import { api } from './api'
import type { Products } from './types'

export async function getProducts({
  select,
  offset,
}: {
  select: string
  offset: number
}) {
  const { data } = await api<Products[]>('products', {
    params: {
      offset: offset,
      limit: select,
    },
  })

  return data
}

export async function deleteProduct(id: number) {
  const { data } = await api.delete(
    `https://api.escuelajs.co/api/v1/products/${id}`,
  )
  return data
}

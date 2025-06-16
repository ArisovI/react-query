export type Products = {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export type ProductBody = {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

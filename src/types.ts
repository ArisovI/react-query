export type Products = {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: {
    id: number
    name: string
    image: string
    slug: string
  }
  images: string[]
}

export type ProductBody = {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

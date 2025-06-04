import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { deleteProduct, getProducts } from './services'
import type { Products } from './types'

export const useGetProducts = ({
  select,
  offset,
}: {
  select: string
  offset: number
}) => {
  return useQuery<Products[]>({
    queryKey: ['products', select, offset],
    queryFn: () => getProducts({ select, offset }),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      alert('Успешно удалено')
    },

    onError: () => {
      alert('Ошибка при удалении')
    },
  })
}

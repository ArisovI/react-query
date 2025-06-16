import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { deleteProduct, getProducts } from './services'
import type { Products } from './types'

export const useGetProducts = () => {
  return useQuery<{ todos: Products[] }>({
    queryKey: ['products'],
    queryFn: getProducts,
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,

    onMutate: async (id) => {
      queryClient.cancelQueries({ queryKey: ['products'] })
      const lastData = queryClient.getQueryData(['products'])

      queryClient.setQueryData(['products'], (oldData) => {
        return {
          todos: oldData.todos.filter((el) => el.id !== id),
        }
      })

      return { lastData }
    },

    onError: (error, _, context) => {
      queryClient.setQueryData(['products'], context?.lastData)
      alert('Ошибка при удалении ' + error.message)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

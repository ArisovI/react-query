import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { deleteProduct, getProducts } from './services'

export const useGetInfinityProducts = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => getProducts({ skip: pageParam, limit }),
    getNextPageParam: (last) => {
      const next = last.skip + last.limit

      return next < last.total ? next : undefined
    },
    initialPageParam: 0,
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['products'] })
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

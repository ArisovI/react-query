import './App.css'
import { useDeleteProduct, useGetProducts } from './queries'

const App = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetProducts()
  const { mutateAsync } = useDeleteProduct()

  return (
    <div className="body">
      <div className="top">
        <h1>Products</h1>
        <button>Create</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>User ID</th>
            <th>Todo</th>
            <th>Actives</th>
          </tr>
        </thead>
        <tbody>
          {isError && <h3>{error.message}</h3>}

          {data !== null && isSuccess && !isLoading ? (
            data?.todos.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.userId}</td>
                <td>{el.todo}</td>
                <td className="actives">
                  <button>Update</button>
                  <button onClick={() => mutateAsync(el.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App

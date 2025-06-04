import { useState } from 'react'
import './App.css'
import { useDeleteProduct, useGetProducts } from './queries'

const App = () => {
  const [select, setSelect] = useState('5')
  const [offset, setOffset] = useState(0)

  const { data, isLoading, isError, error, isSuccess } = useGetProducts({
    select,
    offset,
  })

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
            <th>Title</th>
            <th>Slug</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actives</th>
          </tr>
        </thead>
        <tbody>
          {isError && <h3>{error.message}</h3>}

          {data !== null && isSuccess && !isLoading ? (
            data?.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.title}</td>
                <td>{el.slug}</td>
                <td>{el.price}</td>
                <td>{el.category.name}</td>
                <td>{el.description}</td>
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

        <tfoot>
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>

          <div className="pagination">
            <button onClick={() => setOffset((prev) => prev - Number(select))}>
              Prev
            </button>
            <button onClick={() => setOffset((prev) => prev + Number(select))}>
              Next
            </button>
          </div>
        </tfoot>
      </table>
    </div>
  )
}

export default App

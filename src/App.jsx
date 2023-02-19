import './App.css'
import { useBooks } from './hooks/useBooks'
import { useSearch } from './hooks/useSearch'
import { Books } from './components/Books'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'


function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { books, loading, getBooks } = useBooks({ search, sort })
  
  const debouncedBooks = useCallback (
    debounce(search => {
      getMovies({ search })
    },500)
    ,[getBooks]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getBooks({ search })
  }
  
  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedBooks({ search: newSearch })
  }


  return (
    <div className="page">
      <header>
        <h1>Buscador de Libros</h1>
        <form className='form' onSubmit={handleSubmit} >
          <input onChange={handleChange} value={search} placeholder='El Señor de los Anillos, Brandon Sanderson ...'/>
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        <Books books={books} />
      </main>
    </div>
  )
}

export default App

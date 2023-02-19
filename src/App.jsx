import './App.css'
import { useBooks } from './hooks/useBooks'
import { useSearch } from './hooks/useSearch'
import { Books } from './components/Books'


function App() {
  const { search, updateSearch, error } = useSearch()
  const { books, loading, getBooks } = useBooks({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getBooks({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)

  }

  

  return (
    <div className="page">
      <header>
        <h1>Buscador de Libros</h1>
        <form className='form' onSubmit={handleSubmit} >
          <input onChange={handleChange} value={search} placeholder='El Señor de los Anillos, Brandon Sanderson ...'/>
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

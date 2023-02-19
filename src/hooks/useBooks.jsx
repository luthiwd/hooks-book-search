import { useRef, useState } from 'react'
import { searchBooks } from '../service/books'

export function useBooks ({ search }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getBooks = async ({ search }) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search;
      const newBook = await searchBooks({ search })
      setBooks(newBook)
    } catch (e) {
      setError(e.message)
    }finally{
      setLoading(false)
    }
  }

  return { books, getBooks, loading }
}
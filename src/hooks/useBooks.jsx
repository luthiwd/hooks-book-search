import { useRef, useState, useMemo, useCallback } from 'react'
import { searchBooks } from '../service/books'

export function useBooks ({ search, sort }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getBooks = useCallback (async ({ search }) => {
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
  }, [])

  const sortedBooks = useMemo(() => {
    
    return sort
    ?[...books].sort((a,b) => a.title.localeCompare(b.title))
    :books
  }, [sort, books])


  return { books: sortedBooks, getBooks, loading }
}
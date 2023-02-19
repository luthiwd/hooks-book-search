export const searchBooks = async ({ search }) => {
  if (search === '') return null
  
  try {
    const response = await fetch(`https://www.etnassoft.com/api/v1/get/?book_title=${search}`)
    const json = await response.json()

    const books = json


    return books?.map(book => ({
      id: book.ID,
      title: book.title,
      author: book.author,
      image: book.cover
    }))
  } catch (e) {
    throw new Error('Error searching books')
  }
}
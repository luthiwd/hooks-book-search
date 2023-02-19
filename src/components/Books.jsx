function ListOfBooks({ books }) {
  return (
    <ul className='books'>
      {books.map((book) => (
        <li className='book' key={book.id}>
          <h5>{book.title}</h5>
          <img src={book.image} alt={book.title} />
          <h4>{book.author}</h4>
        </li>
      ))}
    </ul>
  );
}

function NoBooksResults () {
  return (
    <p>No hay libros con ese nombre</p>
  )
} 

export function Books ({ books }) {
  const hasBooks = books?.length > 0 
  
  return (
      hasBooks
      ? <ListOfBooks books={books} />
      : <NoBooksResults />
    
  )

}
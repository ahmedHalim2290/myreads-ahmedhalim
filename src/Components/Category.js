import React from 'react'
import '../App.css'
import { Book } from './Book'

const BookCategory = function (props) {

    let booksChange = (book, cat) => {
        props.booksChange(book, cat);
    }

    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map(b =>
                    <li key={b.id}>
                        <Book BookDetails={b} booksChange={booksChange}></Book>
                    </li>
                )}
            </ol>
        </div>
    )
}


export default BookCategory


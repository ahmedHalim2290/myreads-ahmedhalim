import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import Search from './Components/Search'
import BookCase from './Components/BookCase'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  //to get all book and set State for book state
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    })
  }

  booksChange = (book, cat) => {
    book.props.BookDetails.shelf = cat;
    this.setState({
      books: this.state.books.filter((b) => b.id !== book.props.BookDetails.id).concat([book.props.BookDetails])
    })
    BooksAPI.update(book.props.BookDetails, cat);
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route exact path='/' render={() => (<div><BookCase booksChange={this.booksChange} Allbooks={books}></BookCase><div className="open-search"><Link to="/search">Add a book</Link></div></div>)}></Route>
        </div>
        <Route exact path='/Search' render={() => (<Search booksHaveCat={books} booksChange={this.booksChange}></Search>)}></Route>
      </div>
    )
  }
}

export default BooksApp



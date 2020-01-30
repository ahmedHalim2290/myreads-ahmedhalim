import React, { Component } from 'react'
import '../App.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Book } from './Book'
import * as bookApi from '../BooksAPI'
import { Debounce } from 'react-throttle';
export class Search extends Component {

    static propTypes = {
        booksChange: PropTypes.func.isRequired
    }

    state = {
        books: [],
        query: ''

    }

    Search = (event) => {
        let Query = event.target.value;
        if (Query) {
            bookApi.search(Query).then(Searchedbooks => {
                if (Searchedbooks !== undefined && Searchedbooks.error !== "empty query")
                    this.setState({ books: Searchedbooks });
                else
                    this.setState({ books: [] });

            });
        }
    }

    booksChangeInSeachCom = (book, cat) => {
        this.props.booksChange(book, cat);
    }

    render() {
        const { books } = this.state;
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                            <Debounce time="200" handler="onChange">
                                <input type="text" onChange={this.Search} placeholder="Search by title or author" />
                            </Debounce>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {books.map(b =>
                                <li key={b.id}>
                                    <Book BookDetails={b}
                                        booksChange={this.booksChangeInSeachCom}
                                    ></Book>
                                </li>
                            )}

                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search

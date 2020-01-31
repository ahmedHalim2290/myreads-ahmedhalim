import React, { Component } from 'react'
import '../App.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Book } from './Book'
import * as bookApi from '../BooksAPI'
import { Debounce } from 'react-throttle';
export class Search extends Component {

    static propTypes = {
        booksHaveCat: PropTypes.array.isRequired,
        booksChange: PropTypes.func.isRequired
    }

    state = {
        books: [],
        Booksnotfound: ''
    }
    updateBookSearchState = (books) => {

        if (books !== undefined && books.error !== "empty query") {
            // since the search method does not return proper shelf we need to iterate over our current
            // states and the new search terms to find what the current shelf state is for each book
            let bookIds = books.map(book => book.id);
            // let currentlyReadingIntersect = this.intersect(bookIds, this.state.currentlyReading.map( cr => cr.id));
            let currentlyReadingIntersect = this.intersect(bookIds, this.props.booksHaveCat.filter((cr) => cr.shelf === 'currentlyReading').map(b => b.id));
            let readIntersects = this.intersect(bookIds, this.props.booksHaveCat.filter(r => r.shelf === 'read').map((b) => b.id));
            let wantToReadIntersects = this.intersect(bookIds, this.props.booksHaveCat.filter((wr) => wr.shelf === 'wantToRead').map((b) => b.id));

            for (let i = 0; i < books.length; i++) {
                if (currentlyReadingIntersect.includes(books[i].id)) {
                    books[i].shelf = 'currentlyReading';
                }
                if (readIntersects.includes(books[i].id)) {
                    books[i].shelf = 'read';
                }
                if (wantToReadIntersects.includes(books[i].id)) {
                    books[i].shelf = 'wantToRead';
                }
            }
        }
    }
    intersect = (a, b) => {
        let t;
        if (b.length > a.length) {
            t = b;
            b = a;
            a = t; // indexOf to loop over shorter
        }
        return a.filter(function (e) {
            return b.indexOf(e) > -1;
        });
    }
    Search = (event) => {
        let Query = event.target.value;
        if (Query) {
            bookApi.search(Query).then(Searchedbooks => {
                this.updateBookSearchState(Searchedbooks);
                if (Searchedbooks !== undefined && Searchedbooks.error !== "empty query") {
                    this.setState({ books: Searchedbooks, Booksnotfound: '' });
                }
                else
                    this.setState({ books: [], Booksnotfound: 'Books not found' });

            });
        }
        else
            this.setState({ books: [], Booksnotfound: '' });
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
                        {this.state.Booksnotfound}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search

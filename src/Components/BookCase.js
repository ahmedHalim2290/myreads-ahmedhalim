import React, { Component } from 'react'
import '../App.css'
import PropTypes from 'prop-types'
import BookCategory from './Category'

export class BookCase extends Component {
    static propTypes = {
        Allbooks: PropTypes.array.isRequired,
        booksChange: PropTypes.func.isRequired

    }

    booksChangefun = (book, cat) => {
        this.props.booksChange(book, cat);
    }

    render() {
        const { Allbooks } = this.props;

        return (
            <div>
                <div className="list-books-content">
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <BookCategory
                            books={Allbooks.filter(b => b.shelf === 'currentlyReading')}
                            booksChange={this.booksChangefun}
                        ></BookCategory>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <BookCategory
                            books={Allbooks.filter(b => b.shelf === 'wantToRead')}
                            booksChange={this.booksChangefun}
                        ></BookCategory>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <BookCategory
                            books={Allbooks.filter(b => b.shelf === 'read')}
                            booksChange={this.booksChangefun}
                        ></BookCategory>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookCase

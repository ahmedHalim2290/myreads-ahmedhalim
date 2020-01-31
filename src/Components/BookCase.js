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
        const Categories = [
            { name: 'currentlyReading', title: 'Currently Reading' },
            { name: 'wantToRead', title: 'Want to Read' },
            { name: 'read', title: 'Read' }
        ]
        return (
            <div>
                <div className="list-books-content">
                    {Categories.map(C =>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">{C.title}</h2>
                            <BookCategory
                                books={Allbooks.filter(b => b.shelf === C.name)}
                                booksChange={this.booksChangefun}
                            ></BookCategory>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default BookCase

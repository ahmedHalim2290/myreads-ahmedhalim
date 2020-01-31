import React, { Component } from 'react'
import '../App.css'
import PropTypes from 'prop-types'
import noImage from '../icons/noImage.jpg'


export class Book extends Component {

    static propTypes = {
        BookDetails: PropTypes.object.isRequired,
        booksChange: PropTypes.func.isRequired
    }

    onChangeBook = (event) => {
        this.props.booksChange(this, event.target.value)
    }

    render() {
        const { BookDetails } = this.props;
        return (
            <div>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128, height: 193,
                            backgroundImage: `url(${(BookDetails.imageLinks && BookDetails.imageLinks.thumbnail) ? BookDetails.imageLinks.thumbnail : noImage})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select value={BookDetails.shelf ? BookDetails.shelf : "none"} onChange={this.onChangeBook} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reayding</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{BookDetails.title ? BookDetails.title : 'no title'}</div>
                    <div className="book-authors">{BookDetails.authors ? BookDetails.authors : 'no authors'}</div>
                </div>
            </div>
        )
    }
}

export default Book

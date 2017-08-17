import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                <li>
                    <Book/>
                </li>
            </ol>
        </div>
    </div>
)

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default BookShelf;
import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const prettyTitle = shelf => (
  shelf === 'wantToRead' ? 'Want To Read'
  : shelf === 'currentlyReading' ? 'Currently Reading'
  : 'Read')

const BookShelf = (props) => (
<div className="bookshelf">
    <h2 className="bookshelf-title">{prettyTitle(props.name)}</h2>
    <div className="bookshelf-books">
        <ol className="books-grid">
            {props.books.map((book, i) => (
            <li key={i}>
                <Book
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    bookCover={book.imageLinks && book.imageLinks.smallThumbnail}
                    shelf={book.shelf}
                    book={book}
                    changeShelf={props.changeShelf}
                />
            </li>
            ))}
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
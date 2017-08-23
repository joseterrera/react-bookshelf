import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Book from '../components/Book';

export default class SearchBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired
  }
  
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              ref={userInput => this.userInput = userInput}
              onChange={() => this.props.searchBooks(this.userInput.value)}
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this
              .props
              .books
              .map((book, i) => (
                <li key={i}>
                  <Book book={book} 
                  changeShelf={this.props.changeShelf}
                   title={book.title}
                    authors={book.authors}
                    bookCover={book.imageLinks.smallThumbnail}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}
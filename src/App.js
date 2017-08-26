import React from 'react'
// import { Link } from 'react-router-dom'
import {Route} from 'react-router-dom'
import * as API from './BooksAPI'
import './App.css'
import SearchBooks from './containers/SearchBooks';
import ListBooks from './containers/ListBooks';

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      bookShelves: {},
      books: [],
      filteredBooks: []
    };
  }

  componentDidMount() {
    API
      .getAll()
      .then(books => {
        const bookShelves = this.sortBooks(books);
        const filteredBooks = [];
        this.setState({books, bookShelves, filteredBooks})
      });
  }

  searchBooks = (inputValue) => {
    const books = this.state.books;
    const userInput = inputValue.toLowerCase();
    if(userInput !== '') {
    API.search(userInput, 20).then(filteredBooks => {
        console.log(filteredBooks);
        if (!(!!filteredBooks) || filteredBooks.error ) {
          this.setState({filteredBooks: []})
        } else {
          filteredBooks = filteredBooks.map(book => {
            book.shelf = "none";
            books.forEach(b => {
              if(b.id === book.id)
                book.shelf = b.shelf;
            })
            return book;
          })
          this.setState({filteredBooks})
        }
      })
    }
  }

  //   searchBooks = (inputValue) => {   
  //     const userInput = inputValue.toLowerCase();   
  //     //previously tried with map/filter   //
  // console.log(userInput)  
  //  // const filterBooks = this.state.books.map(book =>
  //  //   book.title.toLowerCase()),filter(b => b.indexOf(userInput) >= 0   // )
  //  // console.log(filterBooks);   
  //  //also tried it with reduce:   
  //  const reducer= input => (acc, bookObj) => {     
  //    return bookObj.title.toLowerCase().indexOf(input) >= 0       
  //     ? acc.concat(bookObj)
  //     : acc   }   
  //     const filteredBooks = (this.state.books.reduce(reducer(userInput), []))   //
  //     console.log(filteredBooks);   
  // }

  changeShelf = (book, status) => {
    const books = [...this.state.books];
    let booksFound = false;

    books.forEach(b => {
      if (b.id === book.id) {
        b.shelf = status;
        booksFound = true;
      }
    });

    if(!booksFound) {
      book.shelf = status;
      books.push(book);

    }

    const bookShelves = this.sortBooks(books);
    //console.log(books, bookShelves);
    this.setState({
      books,
      bookShelves
    }, () => {
      API
        .update(book, status)
        .then(r => console.log('Shell updated', r))
    });
  }

  sortBooks = books => {
    const bookShelves = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
    books.forEach(book => {
      bookShelves[book.shelf].push(book);
    })
    return bookShelves;
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (<ListBooks bookShelves={this.state.bookShelves} changeShelf={this.changeShelf}/>)}/>
        <Route
          exact
          path="/search"
          render={() => (<SearchBooks
          books={this.state.filteredBooks}
          changeShelf={this.changeShelf}
          searchBooks={this.searchBooks}
          bookShelves={this.state.bookShelves}/>)}/>

      </div>
    )
  }
}

export default BooksApp

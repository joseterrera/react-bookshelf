import React from 'react'
// import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as API from  './BooksAPI'
import './App.css'
import SearchBooks from './containers/SearchBooks';
import ListBooks from './containers/ListBooks';

class BooksApp extends React.Component {

  constructor() {
    super();
    this.state = {
      bookShelves: {},
      books: [],
      filteredBooks: [], 
    };
  }

    componentDidMount() {
    API.getAll().then(books => {
      const bookShelves = this.sortBooks(books);
      const filteredBooks = books;
      this.setState({books, bookShelves, filteredBooks})
    });
  }

  execSearch = (query) => {
    const search = this.filteredBooks = API.search(query).then(books => {
      // setState only for the current search result.
      if (this.filteredBooks === search)
        this.setState({ books })
    })
  }

    searchBooks = (inputValue) => {
    const userInput = inputValue.toLowerCase();
    //previously tried with map/filter
    // console.log(userInput)
    // const filterBooks = this.state.books.map(book =>
    //   book.title.toLowerCase()),filter(b => b.indexOf(userInput) >= 0 
    // )
    // console.log(filterBooks);

    //also tried it with reduce:
    const reducer = input => (acc, bookObj) => {
      return bookObj.title.toLowerCase().indexOf(input) >= 0 
        ? acc.concat(bookObj) 
        : acc
    }
    const filteredBooks = (this.state.books.reduce(reducer(userInput), []))
    // console.log(filteredBooks);
    this.setState({filteredBooks})

  }

  changeShelf = (book, status) => {
    const books = [...this.state.books];

    books.forEach(b => {
      if(b.id === book.id) {
        b.shelf = status;
      }
    });

    const bookShelves = this.sortBooks(books);
    //console.log(books, bookShelves);
    this.setState({ books, bookShelves }, () => {
      API.update(book, status)
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
            <Route exact path="/" render={() => (
           <ListBooks 
              bookShelves={this.state.bookShelves}
              changeShelf={this.changeShelf}/>
        )} />
           <Route exact path="/search" render={() => (
            <SearchBooks 
            books={this.state.filteredBooks}
            changeShelf={this.changeShelf}
            execSearch={this.execSearch}
             bookShelves={this.state.bookShelves}  
            /> 
        )} />
     

      </div>
    )
  }
}

export default BooksApp

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
      this.setState({books, bookShelves})
    });
  }

  sortBooks = books => {
    const bookShelves = {};
    books.forEach(b=> {
      if(bookShelves[b.shelf]) {
        bookShelves[b.shelf].push(b);
      } else {
        bookShelves[b.shelf] = [b];
      }
    })
    return bookShelves;
  }

  render() {
    return (
      <div className="app">
            <Route exact path="/" render={() => (
           <ListBooks 
              books={this.state.books}
              bookShelves={this.state.bookShelves}/>
        )} />
           <Route exact path="/search" render={() => (
            <SearchBooks /> 
        )} />
     

      </div>
    )
  }
}

export default BooksApp

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BookShelf from '../components/BookShelf';

export default class SearchBooks extends React.Component {
    render() {
        return (
            <div className="list-books">
                <Link to="/" className="">Back to homepage</Link>
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf/>
                    </div>
                </div>
                <div className="open-search">
                     <Link to="/" className="">Add a book</Link>
                </div>
            </div>
        )
    }
}
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BookShelf from '../components/BookShelf';

export default class SearchBooks extends React.Component {
    static propTypes = {
        bookShelves: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    }
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object
                            .keys(this.props.bookShelves)
                            .filter(key => key !== 'none')
                            .map((key, i) => (<BookShelf
                                key={i}
                                name={key}
                                changeShelf={this.props.changeShelf}
                                books={this.props.bookShelves[key]}/>))
}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search" className="">Add a book</Link>
                </div>
            </div>
        )
    }
}
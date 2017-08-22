import React from 'react';
import PropTypes from 'prop-types';

export default class Book extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

    render() {
        const { book, changeShelf } = this.props;
        const { title, shelf } = book;
        // console.log(this.props)
        return (

            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${this.props.bookCover})`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select
                            onChange={() => changeShelf(book, this.select.value)}
                            ref={select => this.select = select}
                            value={shelf}
                        >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{this.props.authors}</div>
            </div>
        )
    }
}
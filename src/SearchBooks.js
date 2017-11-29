import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './App.css';
import Book from "./Book";
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
  state = {
    books: [],
  };

  onEnterKey = (query) => {
    console.log(query);
    BooksAPI.search(query, 10).then(books => {
      console.log(books);
      this.setState({books: books});
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Back</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              onKeyDown={event => (event.keyCode===13 ? this.onEnterKey(event.target.value) : null)} 
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>(
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;

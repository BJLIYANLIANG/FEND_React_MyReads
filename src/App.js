import React from 'react'
import { Route, Link } from 'react-router-dom';
import './App.css'
import Book from "./Book";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books : [],
  }

  changeBookShelf = (book, shelf) => {
    let books = this.state.books;
    books.forEach(b => {
      if(b.id === book.id) {
        b.shelf = shelf;
      }
    });
    this.setState({books: books});
    BooksAPI.update(book, shelf);
  };

  componentDidMount() {
    BooksAPI.getAll().then(results => {
      this.setState({books: results});
    });
  }

  render() {
    let currently_book = this.state.books.filter(book => book.shelf === 'currentlyReading');
    let wantToRead_book = this.state.books.filter(book => book.shelf === 'wantToRead');
    let read_book = this.state.books.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {currently_book.map(book =>(
                        <li key={book.id}>
                          <Book book={book} onShelfChange={this.changeBookShelf} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {wantToRead_book.map(book =>(
                        <li key={book.id}>
                          <Book book={book} onShelfChange={this.changeBookShelf} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {read_book.map(book =>(
                        <li key={book.id}>
                          <Book book={book} onShelfChange={this.changeBookShelf} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            onAddBook={(boot, type) => {
              console.log("add Book");
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

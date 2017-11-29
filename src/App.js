import React from 'react'
import { Route, Link } from 'react-router-dom';
import './App.css'
import Book from "./Book";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books : [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(results => {
      this.setState({books: results});
    });
  }

  render() {
    let currently_book = this.state.books.filter(book => book.shelf === 'currentlyReading');
    let wantToRead_book = this.state.books.filter(book => book.shelf === 'wantToRead');
    let read_book = this.state.books.filter(book => book.shelf === 'read');

    console.log(this.state.books);

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
                          <Book book={book} />
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
                          <Book book={book} />
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
                          <Book book={book} />
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

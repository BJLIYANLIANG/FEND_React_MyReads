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

  /**
   * 修改书的shelf，如果书不存在，就添加书，会同步到云端
   * @param {Book} book 需要修改的书
   * @param {string} shelf 
   */ 
  changeBookShelf = (book, shelf) => {
    let books = this.state.books;
    let is_find = false;
    books.forEach(b => {
      if(b.id === book.id) {
        b.shelf = shelf;
        is_find = true;
      }
    });
    if (!is_find) {
      book.shelf = shelf;
      books.push(book);
    }
    this.setState({books: books});
    BooksAPI.update(book, shelf);
  };

  componentDidMount() {
    BooksAPI.getAll().then(results => {
      this.setState({books: results});
    });
  }

  render() {
    // 三个筛选器
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
                {
                  [currently_book, wantToRead_book, read_book].map((books, index) => (
                      <div className="bookshelf" key={index}>
                        <h2 className="bookshelf-title">{books.length>0 && books[0].shelf}</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            {books.map(book =>(
                              <li key={book.id}>
                                <Book book={book} onShelfChange={this.changeBookShelf} />
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )
                  )
                }
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            localBooks={this.state.books.map(book => ({id:book.id, shelf:book.shelf}))}
            onAddBook={(book, shelf) => {
              this.changeBookShelf(book, shelf);
              history.push('/');
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

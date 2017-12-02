import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './App.css';
import Book from "./Book";
import * as BooksAPI from './BooksAPI'

/**
 * 搜索书本的组件
 */
class SearchBook extends Component {
  state = {
    books: [],
  };

  /**
   * 当用户在输入框的情况下按下回车，出发此方法
   * @param {string} query 要搜索的关键词
   * 注意，只支持这些 Cook 等少数关键次
   */
  onEnterKey = (query) => {
    console.log("query" + query);

    BooksAPI.search(query, 10).then(books => {
      let localBookMap = new Map();
      for(let localBook of this.props.localBooks) {
        localBookMap.set(localBook.id, localBook.shelf);
      }
      // 从本地书本里面同步 shelf信息
      for(let book of books) {
        if (localBookMap.has(book.id)) {
          book.shelf = localBookMap.get(book.id);
        } 
      }
      this.setState({books: books});
    });
  }

  /**
   * 用户添加书本
   * @param {Book} book 要添加的书本
   * @param {string} shelf 
   */
  addBook = (book, shelf) => {
    this.props.onAddBook(book, shelf);
  };

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
                <Book book={book} onShelfChange={this.addBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;

import React, { Component } from 'react';

/**
 * 书本组件
 */
class Book extends Component {

  state = {
      shelf: "none"
  }

  /**
   * 当自己的状态发生改变触发
   * @param {Event} event 
   */
  onShelfChange = (event) => {
    let shelf = event.target.value;
    this.props.onShelfChange(this.props.book, shelf)
    this.setState({shelf: shelf});
  };

  componentDidMount() {
    if ('shelf' in this.props.book) {
        this.setState({shelf: this.props.book.shelf});
    }
  }

  render() {
    let book = this.props.book;

    const coverStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url(${book.imageLinks.smallThumbnail})`
    };

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={coverStyle}
          />
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={this.onShelfChange}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(' ') : ''}</div>
      </div>
    );
  }
}

export default Book
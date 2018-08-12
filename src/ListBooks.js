import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
	    <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {/*We use the BookShelf component to dynamically render the shelves, and hardcode their title. We grab the props (filtered books) from app.js. Then we add the functionality for changing shelves.*/}
          <BookShelf shelfTitle="Currently Reading" bookList={this.props.currentlyReading} changeShelf={this.props.changeShelf} />
          <BookShelf shelfTitle="Want to Read" bookList={this.props.wantToRead} changeShelf={this.props.changeShelf} />
          <BookShelf shelfTitle="Read" bookList={this.props.read} changeShelf={this.props.changeShelf} />
        </div>
        <div className="open-search">
          {/*I changed this to a Link component, which still renders an anchor tag, using a 'to' prop instead of href. I used a real URL, "/search". React-router does the work for us on click. */}
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
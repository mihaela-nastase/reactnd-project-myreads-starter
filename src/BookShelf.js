import React, { Component } from "react";
import BookItem from "./BookItem";

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
	    {/*We grab the shelfTitle from the ListBooks component*/}
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
		    {/*We map the book props assigned to each shelf (in the ListBooks component) to dynamically render the books with the help of the BookItem component. Each book has a unique key prop, used to track changes to specific child elements in the array. We also add functionality for changing the shelves.*/}
            {this.props.bookList.map(book => {
              return (
                <BookItem
                  key={book.title}
                  book={book}
                  changeShelf={this.props.changeShelf}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
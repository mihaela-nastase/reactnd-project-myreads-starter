import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookItem from "./BookItem";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  state = {
    query: "",
    books: []
  };

  /*Whenever the input field changes, we want to go ahead and update our query. So I made an update query method. This takes an end of query and updates the state. We’re not going to be updating the new state based off the previous state, so we can just pass this object. We check the shelves of the books found with the addShelf method. If no books are found, we clear the array. */
  updateQuery = query => {
    this.setState({ query: query });
    if (query) {
      let searchResults = [];
      BooksAPI.search(query, 20).then(results => {
        if (results && results.length) {
          searchResults = results.map(result => {
            result.shelf = this.checkShelf(result);
            return result;
          });
          this.setState({ books: searchResults });
        } else {
          this.setState({ books: [] });
        }
      });
    }		
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };
 
  /*We verify if the book id corresponds to a book on the main page, and update its shelf. If it doesn't, we set the shelf to 'none'. Source for the solution: https://github.com/dandenney/my-reads/blob/master/src/SearchBooks.js */
  checkShelf(result) {
    let hasShelf = this.props.books.filter(book => book.id === result.id);
    return hasShelf.length ? hasShelf[0].shelf : "none";
  }

  render() {
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/*I changed this to a Link component, which still renders an anchor tag, using a 'to' prop instead of a href. I used the URL to go back to the main page, "/". React-router does the work for us on click. */}
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
			  NOTES: The search from BooksAPI is limited to a particular set of search terms.
			  You can find these search terms here:
			  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

			  However the BooksAPI.search method DOES search by title or author. So, don't worry if
			  you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
		    {/*If books are found, render the books and add the change shelf functionality*/}
            {this.state.books.length > 0 &&
              this.state.books.map(book => (
                <BookItem
                  key={book.title}
                  book={book}
                  changeShelf={this.props.changeShelf}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
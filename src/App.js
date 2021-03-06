import React from "react";
import { Route } from "react-router-dom";
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  /*This lifecycle event is invoked immediately after the component is inserted into the DOM. We call 'BooksAPI.getAll', that's going to return as a promise so then we can call '.then'. This function is going to be invoked with our books, so we call 'this.setState' and we pass in books. */
  async componentDidMount() {
    const books = await BooksAPI.getAll()
      this.setState({ books });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
	book.shelf = shelf;
        this.setState(state => ({
           books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }));
	};


  render() {
	/*We filter the books so we can easily assign them to their respective shelves in the ListBook component, passing them as props*/
    const state = this.state;
    const currentlyReadingList = state.books.filter(book => book.shelf === "currentlyReading");
    const wantToReadList = state.books.filter(book => book.shelf === "wantToRead");
    const readList = state.books.filter(book => book.shelf === "read");

    return (
      <div className="app">
        {/**
         * We use the URL in the browser's address bar to keep track of which page the user is on.
         * This ensures that users can use the browser's back and forward buttons to navigate
         * between pages, as well as provide a good URL they can bookmark and share.
         */}
        <Route
          exact path="/"
          render={() => (
            <ListBooks
              currentlyReading={currentlyReadingList}
              wantToRead={wantToReadList}
              read={readList}
              changeShelf={this.changeShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              books={this.state.books}
			  changeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
import React, { Component } from "react";
import noCover from "./icons/Simple-Image-Not-Found-Icon.svg";

class BookItem extends Component {
	state = {
		 currentShelf: this.props.book.shelf,
	}
	
	changeShelf = (event) => {
      this.props.changeShelf(this.props.book, event.target.value);
      this.setState({
        currentShelf: event.target.value
      });
	};
	
  render() {

    /* We verify that the cover image exists. If not, we use a default image.
	 * We also verify that the tile exists. If not, we use a replacement title. Source:
	 * https://github.com/sarah-maris/reactnd-project-myreads/commit/de1e41da8c84ec5d331f3cdc61cbde6fa231d633
    */
    const coverImg = this.props.book.imageLinks && this.props.book.imageLinks.thumbnail ? this.props.book.imageLinks.thumbnail : noCover;
    const title = this.props.book.title ? this.props.book.title : "No title available";

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${coverImg})`
              }}
            />

            <div className="book-shelf-changer">
              <select value={this.state.currentShelf} onChange={this.changeShelf}>
                {console.log(this.props.book + this.props.book.shelf)}
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </li>
    );
  }
}

export default BookItem;
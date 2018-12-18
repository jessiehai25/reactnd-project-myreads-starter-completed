import React, {Component} from 'react'
import BookDisplay from './bookDisplay'

class shelfDisplay extends Component{
		state = {
		shelfs : [
				{
					action:"currentlyReading",
					shelfName:"Currently Reading",
				}, 
				{
					action:"wantToRead",
					shelfName:"Want to Read",
				},
				{
					action:"read",
					shelfName:"Read",
				} 
			]
	}
	render(){
			const currentReads = this.props.books.filter((book)=>book.shelf === "currentlyReading")
			const wantToRead = this.props.books.filter((book)=>book.shelf === "wantToRead")
			const read = this.props.books.filter((book)=>book.shelf === "read")
		return(
			<div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <BookDisplay book = {currentReads} handleChange = {this.props.handleChange}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BookDisplay book = {wantToRead} handleChange = {this.props.handleChange}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BookDisplay book = {read} handleChange = {this.props.handleChange}/>
                  </div>
                </div>
              </div>
            </div>
			)
	}

}
export default shelfDisplay;
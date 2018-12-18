import React, {Component} from 'react'


class bookDisplay extends Component{

	state = {
		title: "",
	}
	render(){
		return(
			<ol className="books-grid">
                    {this.props.book.map((book)=>(

                        <li key = {book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" 
                              		style={{ 
                              			width: 128, 
                              			height: 193, 
                              			backgroundImage:`url("${book.imageLinks ?  book.imageLinks.thumbnail : ''}")`
                              		}}>
                              </div>
                              <div className="book-shelf-changer">
                                <div>
					              <select 
					              value = {book.shelf? book.shelf : "none"}		              
					              onChange = {(event) => this.props.handleChange(event.target.value, book)}>
					                    <option value="move" disabled>Move to...</option>
					                    <option value="currentlyReading">Currently Reading</option>
					                    <option value="wantToRead">Want to Read</option>
					                   	<option value="read">Read</option>
					               		<option value="none">None</option>
					               </select>
					               </div>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors ? book.authors : "no author available"}</div>
                          </div>
                        </li>
                      )
                      )}
            </ol>

			)
	}

}
export default bookDisplay;
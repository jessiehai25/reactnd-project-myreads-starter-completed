import React, {Component} from 'react'
import BookDisplay from './bookDisplay'
import * as BooksAPI from './BooksAPI' 


class searchResult extends Component{

	state = {
		query : '',
		books : [],
		showingBooks:[],
		currentBooks: this.props.currentBooks
	}
	updateQuery = (query, currentBooks) => {
		const currentBookss = currentBooks
		
		query === ""
		? this.setState(()=>({books: [], query : ""}))
		: BooksAPI.search(query)
	    .then((books) => {
	    	if (!books.error) {
		    	//BooksAPI.update(books,"none")
		    	//.then(()=>{
		    	//	currentBookss.map((book)=>(BooksAPI.update(book,book.shelf)))
		    		BooksAPI.search(query)
		    		.then((books) => {
		    			const booksfinal = this.matchBookUpdateShelf(currentBookss, books)
		    			console.log(booksfinal)    			
				      this.setState(()=>({
				        books: books,
				        query: query,
				      }))
				    })
				     
				//})
			}else{
				this.setState(()=>({
				books: [],
				query: query,
				}))
			}
		})
	}

	matchBookUpdateShelf = (bookShelfList, searchBooksList)=>{
		const booklistFinal = searchBooksList
		for (var i = 0; i < bookShelfList.length; i++) {
			for (var j = 0; j < searchBooksList.length; j++) {
				if(searchBooksList[j].id=== bookShelfList[i].id){
					booklistFinal[j] = bookShelfList[i]
				}
			}
			
		}
		return booklistFinal
	}
	
	render(){
		const query = this.state.query
		const currentBooks = this.props.books

		return(
			<div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value = {query}
                  onChange = {(event)=>this.updateQuery(event.target.value, currentBooks)}
                />
                <BookDisplay book = {this.state.books} handleChange = {this.props.handleChange}/>
              </div>


			)
	}
}
export default searchResult;
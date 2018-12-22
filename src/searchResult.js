import React, {Component} from 'react'
import BookDisplay from './bookDisplay'
import * as BooksAPI from './BooksAPI' 


class searchResult extends Component{

	state = {
		query : '',
		books : [],
	}
	updateQuery = (query, currentBooks) => {
		const currentBookss = currentBooks
		
		query === ""
		? this.setState(()=>({books: [], query : ""}))
		: this.setState(()=>({
	    		query: query,
	    	}), ()=>{
				BooksAPI.search(query)
		    	.then((books) => {
		    		if (!books.error) {
	    		
		    	//BooksAPI.update(books,"none")
		    	//.then(()=>{
		    	//	currentBookss.map((book)=>(BooksAPI.update(book,book.shelf)))
			    			this.setState(()=>({
			    				books:this.matchBookUpdateShelf(currentBookss, books)
			    				}))   			
					      
				//})
					}else{
						this.setState(()=>({
						books: [],
						}))
					}
				})
		    }
		)
	}

	matchBookUpdateShelf = (bookShelfList, searchBooksList)=>{
		const searchBooksListFinal = searchBooksList
		console.log(searchBooksList)
		console.log(bookShelfList)
				searchBooksListFinal.map((searchbook)=>{
					searchbook.shelf="none"	
					bookShelfList.map((bookonshelf)=>{ 
					if (searchbook.id === bookonshelf.id){
						searchbook.shelf = bookonshelf.shelf
					}

				})
			})

			/*for (var i = 0; i < bookShelfList.length; i++) {
				for (var j = 0; j < searchBooksList.length; j++) {
					if(searchBooksList[j].id=== bookShelfList[i].id){
						booklistFinal[j] = bookShelfList[i]
					}
				}*/
				
			return searchBooksListFinal
		}
	
	
	render(){
		const query = this.state.query
		const currentBooks = this.props.books

		return(
			<div className="search-books-input-wrapper">
			{console.log("current",currentBooks)}
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
                <BookDisplay book = {this.matchBookUpdateShelf(currentBooks, this.state.books)} handleChange = {this.props.handleChange}/>
              </div>


			)
	}
}
export default searchResult;
import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI' 
import SearchResult from './searchResult'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import ShelfDisplay from './shelfDisplay'

class BooksApp extends React.Component {
  state = {
      books: [],
      update: false,  
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((books) => {
      this.setState(()=>({
        books
      }))
    })
  }


  handleChange = (action, book) => {
    console.log(book,action)
    BooksAPI.update(book, action)
    .then(()=>{
      BooksAPI.getAll()
    .then((books) => {
      this.setState(()=>({
        books
      }))
    })
    })
  }
/*  addBook = (action, book) => {
    const newBook = book
    newBook.shelf = action
    action === "currentlyReading" &&(

        this.setState((currentState) => ({
          currentReads:currentState.currentReads.concat([newBook])
        }))
    )
    action === "wantToRead" &&(
      this.setState((currentState) => ({
          wantToRead:currentState.wantToRead.concat([newBook])
        }))
      )
    action === "read" &&(
      this.setState((currentState) => ({
          readAlready:currentState.readAlready.concat([newBook])
        }))
      )
}

  removeBook = (action, book) =>{
    if (action ==="none"){
      return this.state
    }
    this.setState((currentState) => ({
      currentReads: currentState.currentReads.filter((b)=>{
        return b.title !== book.title
      }),
      wantToRead: currentState.wantToRead.filter((b)=>{
        return b.title !== book.title
      }),
      readAlready: currentState.readAlready.filter((b)=>{
        return b.title !== book.title
      })
    }))
  }
*/


  render() {
    return (
      <div className="app">
      {console.log(this.state.books)}
        <Route exact path="/" render={({history})=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ShelfDisplay books = {this.state.books} handleChange = {this.handleChange}/>
            
            <div className="open-search">
              <button onClick={() => history.push('./search')}>
              Add a book
                <Link
              className="open-search"
              to='/search'
            ></Link>
              </button>
            </div>
          </div>
        )}/>
        <Route path='/search' render={({history})=>(
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => history.push('/')}>Close</button>
              <SearchResult 
                books = {this.state.books} 
                handleChange = {this.handleChange} 
              />
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>

        )}/>
      </div>
    )
  }
}

export default BooksApp

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { getMovieList } from './utils'

import Header from './Header'
import MoviesList from './MoviesList'
import MovieDetail from './MovieDetail'
import Loading from './Loading'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
      searchResults: [],
      pagination: {
        page: null,
        totalPages: null
      }
    }
  }

  componentDidMount() {
    this.searchMovies()
  }

  searchMovies = (searchQuery, page) => {
    getMovieList(searchQuery, page)
      .then(res => {
        const {
          page,
          total_pages: totalPages,
          results: searchResults
        } = res.data

        this.setState({
          searchQuery,
          searchResults,
          pagination: { page, totalPages }
        })
      })
      .catch(console.error)
  }

  handlePaginationChange = change => {
    const { searchQuery, pagination } = this.state
    let { page } = pagination
    this.searchMovies(searchQuery, page + change)
  }

  render() {
    const { searchQuery, searchResults, pagination } = this.state
    return (
      <Router>
        <Header handleChange={this.searchMovies} />
        {
          !searchQuery && !searchResults.length
            ? <Loading />
            : <Switch>
                <Route path='/movie/:movieId' component={MovieDetail} />
                <Route path='/' render={() =>
                  <MoviesList
                    movies={searchResults}
                    handleChange={this.handlePaginationChange}
                    pagination={pagination}
                  /> }
                />
              </Switch>
        }
      </Router>
    )
  }
}

export default App

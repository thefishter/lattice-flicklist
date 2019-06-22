import React from 'react'

import Pagination from './Pagination'
import MoviePreview from './MoviePreview'

const MoviesList = props => {
	const { movies, pagination, handleChange } = props

	if (!movies.length) return (
		<div className="container m-5">
			<h6>Sorry - no results found.</h6>
		</div>
	)

	return (
	  <div className="container-fluid-width mx-5">
	  	<Pagination
	  		topOfPage
	  		handleChange={handleChange}
        totalPages={pagination.totalPages}
        page={pagination.page} />
		  <div className="row justify-content-center">
		  	{
			  	movies.map(movie =>
			  	  <MoviePreview key={movie.id} movie={movie} /> )
		  	}
	  	</div>
	  	<Pagination
	  		bottomOfPage
	  		handleChange={handleChange}
        totalPages={pagination.totalPages}
        page={pagination.page} />
	  </div>
  )
}

export default MoviesList

import React, { Component } from "react"
import { withRouter } from "react-router"

import { getMovieInfo, getMoviePoster, getMovieCast } from './utils'

import Loading from './Loading'

class MovieDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			imgBuffer: null,
			movieDetail: null
		}
	}

	componentDidMount() {
		const { location } = this.props

		/* If this page was reached via a movie preview within the movie list,
			 movie details will already be within state on the location object. */
		this.getPosterAndCast(location.state && location.state.movie)
			.then(([ movie, castRes, posterRes ]) => {
				this.setState({
					imgBuffer: `data:image/jpeg;base64,${posterRes.data}`,
					movieDetail: { ...movie, cast: castRes.data }
				})
			})
			.catch(console.error)

	}

	getPosterAndCast = async (movie, poster_path) => {
		if (!movie)
			// If we don't already have movie details, fetch the movie info
			movie = await getMovieInfo(this.props.match.params.movieId)
				.then(res => new Promise(resolve => resolve(res.data) ))
				.catch(console.error)

		// Then fetch the movie's cast and full poster image
		return Promise.all([
			movie,
			getMovieCast(movie.id),
			getMoviePoster(movie.poster_path, 'full')
		])
	}

	render() {
		const { imgBuffer, movieDetail } = this.state
		if (!movieDetail) return <Loading />

		const { title, vote_average, overview, release_date } = movieDetail
		return (
	    <div className="container-fluid-width m-5">
	  	  <div className="row text-center">
	  	  	<div id="image-container" className="d-flex col-5">
				  	<img className="m-auto img-fluid rounded-sm align-self-center"
				  			 src={imgBuffer} alt={`movie poster for ${title}`} />
				  </div>
			    <div className="col-7 col-lg-6 col-xl-5 px-4 align-self-center">
			    	<h4 className="mb-4">{title}</h4>
			    	<p className="d-flex justify-content-between pr-4">
				    	<span>{release_date}</span>
				    	<span>{vote_average}/10</span>
				    </p>
			    	<p className="text-left">{overview}</p>
			    	<p className="text-left smaller-text">Starring: {movieDetail.cast.join(', ')}</p>
			    </div>
			  </div>
		  </div>
	  )
	}
}

export default withRouter(MovieDetail)

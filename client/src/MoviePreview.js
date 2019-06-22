import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { getMoviePoster } from './utils'

class MoviePreview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			imgBuffer: null
		}
	}

	componentDidMount() {
		const { poster_path } = this.props.movie
		if (poster_path) {
			getMoviePoster(poster_path, 'thumb')
				.then(res => this.setState({
					imgBuffer: `data:image/jpeg;base64,${res.data}`
				}))
				.catch(console.error)
		}
	}

	passPropsAsState = () => {
		const { imgBuffer } = this.state
		const { movie } = this.props
		return { imgBuffer, movie }
	}

	render() {
		const { id, title, poster_path } = this.props.movie
		const previewWidth = 185
		// `${process.env.REACT_APP_POSTER_THUMB_SIZE}px`

		const imgSrc = poster_path && this.state.imgBuffer
			? this.state.imgBuffer
			: 'https://via.placeholder.com/185x278?text=No+poster+preview'

		return (
			<div id="movie-preview" className="p-3" >
				<Link to={{ pathname: `/movie/${id}`, state: this.passPropsAsState() }}
							className="link" >
					<img className="rounded-sm" src={imgSrc} alt={`movie poster for ${title}`} />
					<p className="text-center mt-2 mb-0"
							style={{ width: previewWidth }} >{title}</p>
				</Link>
			</div>
		)
	}
}

export default MoviePreview

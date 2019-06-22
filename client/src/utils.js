import axios from 'axios'


export const getMovieList = (query, page) =>
	query
		? axios.post(`/api/search`, { query, page })
		: axios.get(`/api`, { params: { page } })


export const getMovieInfo = movieId =>
	axios.get(`/api/movie/${movieId}`)


export const getMovieCast = movieId =>
	axios.get(`/api/movie/${movieId}/cast`)


export const getMoviePoster = (posterPath, size) =>
	axios.get(`/api/images/poster/${posterPath}/${size}`)

import express from 'express'
import axios from 'axios'

const router = express.Router()

const AUTH_QUERY = `?api_key=${process.env.REACT_APP_MDB_API_KEY}`

/* Retrieves most popular movies. Pagination enabled. */
router.get('/api', (req, res, next) => {
	const paginationQuery = req.query.page
		? `&page=${req.query.page}`
		: ''

	return axios.get(`https://api.themoviedb.org/3/movie/popular${AUTH_QUERY}${paginationQuery}`)
		.then(response => {
			res.status(200).send(response.data)
		})
		.catch(err => {
			console.error(err)
			res.redirect('/api/error')
		})
})

/* Retrieves poster image for given movie based on its poster path/URL, found on the movie object. Can specify whether to retrieve the full version or the thumbnail version. */
router.get('/api/images/poster/:posterPath/:size', (req, res, next) => {
	let { size, posterPath } = req.params
	const width = size === 'full'
		? `w${process.env.REACT_APP_POSTER_FULL_SIZE}`
		: `w${process.env.REACT_APP_POSTER_THUMB_SIZE}`
	const baseURL = process.env.REACT_APP_BASE_IMAGE_URL
	// fetch poster in desired size from tmdb
	const fullURL = `${baseURL}${width}/${posterPath}${AUTH_QUERY}`
	return axios.get(fullURL, { responseType: 'arraybuffer' })
	.then(response => {
		// load image into buffer to send to react
		const buffer = Buffer.from(response.data, 'binary').toString('base64')
		res.status(200).send(buffer)
	})
	.catch(err => {
		const { status, statusText, config } = err.response
		console.error('ERROR!', status, statusText, config.url)
		res.redirect('/api/error')
	})
})

/* Retrieves a given movie based on its ID. */
router.get('/api/movie/:id', (req, res, next) => {
	const movieId = req.params.id
	return axios.get(`https://api.themoviedb.org/3/movie/${movieId}${AUTH_QUERY}`)
		.then(response => {
			res.status(200).send(response.data)
		})
		.catch(err => {
			console.error(err)
			res.redirect('/api/error')
		})
})

/* Retrieves the cast for a given movie. */
router.get('/api/movie/:id/cast', (req, res, next) => {
	const movieId = req.params.id
	return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits${AUTH_QUERY}`)
		.then(response => {
			const { cast } = response.data
			res.status(200).send(cast.map(member => member.name))
		})
		.catch(err => {
			console.error(err)
			res.redirect('/api/error')
		})
})

/* Searches movies. Pagination enabled. */
router.post('/api/search', (req, res, next) => {
	const { page, query } = req.body
	const paginationQuery = page ? `&page=${page}` : ''

	return axios.post(`https://api.themoviedb.org/3/search/movie${AUTH_QUERY}&query=${query}${paginationQuery}`)
		.then(response => {
			res.status(200).send(response.data)
		})
		.catch(err => {
			console.error(err)
			res.redirect('/api/error')
		})

})

router.get('/api/error', (req, res, next) => {
	return res.status(500).send({ 'message': 'sorry! we messed up :('})
})

export default router

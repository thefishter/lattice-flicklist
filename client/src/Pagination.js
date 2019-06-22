import React from 'react'

const Pagination = props => {
	const { page, totalPages, handleChange } = props
	let verticalMargin = ''
	if (props.topOfPage) verticalMargin = 'mt-5'
	else if (props.bottomOfPage) verticalMargin = 'mb-5'

	return (
		<div className={`Pagination ${verticalMargin} mx-5 text-right`}>
			<button onClick={() => handleChange(-1)} disabled={page === 1} >
				<i className="fa fa-lg fa-caret-left" />
			</button>
			<span>Page {page} of {totalPages}</span>
			<button onClick={() => handleChange(1)} disabled={page === totalPages} >
				<i className="fa fa-lg fa-caret-right" />
			</button>
		</div>
	)
}

export default Pagination

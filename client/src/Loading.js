import React from 'react'

const Loading = props =>
	<div className="Loading">
		<img src={`${process.env.PUBLIC_URL}/lattice-logo-color.png`}
				 className="LoadingImg d-flex m-auto w-25 h-25" alt="lattice logo, rotating" />
	</div>

export default Loading

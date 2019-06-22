import React, { Component } from "react"
import { Link } from "react-router-dom"

import debounce from 'lodash.debounce'

class Header extends Component {
	constructor(props) {
		super(props)
		// Wait for user to stop typing before firing search
		this.debouncedSearch = debounce(this.props.handleChange, 400)
	}

	search = e => {
		this.debouncedSearch(e.target.value)
	}

	render() {
		const { searchQuery } = this.props
		return (
		  <nav id="header" className="navbar navbar-light justify-content-between" >
		    <h3 className="ml-5 pt-4 pb-3">
		    	<Link to='/'>
			    	Lattice Flicklist
		    	</Link>
		    </h3>

				<form id="movie-search" className="col-sm-6 col-lg-4 mr-3">
					<div className="input-group mb-2 mr-sm-2" >
			      <div className="input-group-prepend input-group-text px-0">
			      	<i className="fa fa-search"></i>
				    </div>
				    <input
				    	className="form-control input-group-text text-left"
				    	type="text"
				    	value={searchQuery}
				    	onChange={this.search}
				    	placeholder="Search movies" />
				  </div>
				</form>
		  </nav>
	  )
	}
}

export default Header

import React from 'react'


// View
var LingoSearchBar = React.createClass({

	render: function(){

		return (
			<h1 className="search-bar">
				WTF <small>is </small>
				<input 
					value={this.props.filterText}
					onChange={this.props.onChange} />
			</h1>
		);
	}
});

export default LingoSearchBar;
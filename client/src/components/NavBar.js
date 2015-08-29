import React from 'react';

var LingoNavBar = React.createClass({
		
	render : function(){

		return (
			<div className="nav-bar">
				<button value="browse" onClick={this.props.onClick}>Browse</button>
				<button value="search" onClick={this.props.onClick}>Search</button>
			</div>
		);
	}
});

export default LingoNavBar;
import React from 'react';


var LingoSearchTile = React.createClass({
	
	render: function(){

		return (
			<div className="search-tile" >
				<h2>{this.props.term.Name}</h2>
				<p>{this.props.term.Definition}</p>
			</div>
		);
	}
});

export default LingoSearchTile;
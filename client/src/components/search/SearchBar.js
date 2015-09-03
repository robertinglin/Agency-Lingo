import React from 'react';
import {addRoutes,navigatorFor} from 'lucid-router';

// View
var LingoSearchBar = React.createClass({

	render: function(){

		return (
			<div className="container">
			<div id="browse" value="browse" onClick={navigatorFor('/')}>Browse</div>
			
			<h2 className="search-bar jumbotron">
				<span className="wtf">WTF</span> <small>is</small>
				<input 
					value={this.props.filterText}
					onChange={this.props.onChange} />
			</h2>
			</div>
		);
	}
});

export default LingoSearchBar;
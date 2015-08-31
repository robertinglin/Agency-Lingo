import React from 'react';
import LingoSearchContainer from '../search/SearchContainer';

import LingoTermEditor from './TermEditor';


var LingoAdminTool = React.createClass({

	getInitialState: function(){

		return {
			activeTerm: ''
		};
	},

	setActive: function( active ){

		this.setState( { activeTerm: active })
		

	},

	render: function(){

		return (
			<div>
				this is the admin tool.
				<LingoSearchContainer terms={this.props.terms} setActive={this.setActive} />
				<LingoTermEditor term={this.state.activeTerm} />
			</div>
		);
	}
});

export default LingoAdminTool;
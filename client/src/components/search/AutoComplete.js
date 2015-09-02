import React from 'react';
import LingoTile from '../tile/Tile';

var LingoAutoComplete = React.createClass({

	selectOption: function( value ) {
		
		this.props.onSelectOption( value );
	},
	
	render: function(){

		return (
			<div>
				{this.props.autoCompleteOptions
					.map( option => 
						 <LingoTile term={option} key={option} onClick={this.selectOption} />
					)
						
				}
			</div>
		);
	}
});

export default LingoAutoComplete;
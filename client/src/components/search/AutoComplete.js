import React from 'react';

var LingoAutoComplete = React.createClass({

	selectOption: function( event ) {
		console.log( this.props )
		this.props.onSelectOption( event.target.value );
	},
	
	render: function(){

		return (
			<div>
				{this.props.autoCompleteOptions
					.map( option => 
						<button onClick={this.selectOption} value={option}>{option}</button>
					)
				}
			</div>
		);
	}
});

export default LingoAutoComplete;
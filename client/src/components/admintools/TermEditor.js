import React from 'react';

var LingoTermEditor = React.createClass({

	onNameChange: function(){

	},
	onDefinitionChange: function(){

	},
	render: function(){

		return ( 
			<div>
				{this.props.term ? (
					<div>
						<div>
							<input type="text" value={this.props.term} onChange={this.onNameChange} />
						</div>
						<div>
							<textarea value={this.props.term} onChange={this.onDefinitionChange} ></textarea>
						</div>
					</div>

				) : ''}
			</div>
			);
	}
});

export default LingoTermEditor;
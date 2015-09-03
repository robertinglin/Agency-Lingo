import React from 'react/addons';
import LingoSearchContainer from '../search/SearchContainer';
import LingoTile from '../tile/Tile';

import LingoTermEditor from './TermEditor';
import {CreateTerm, EditTerm, RemoveTerm} from '../../stores/TermActions';



var LingoAdminTool = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function(){

		return {
			activeTerm: '',
			newTermName: '',
			newTermDefinition: '',
			submitText: 'Create',
			termNameTile: ''
		};
	},

	setActive: function( active ){

		this.setState( { activeTerm: active })
		

	},

	checkTermName: function( event ) {

		var newTermName = event.currentTarget.value,
			submitText = 'Create',
			termData = this.props.getTermByName( newTermName ),
			termNameTile = '';

		if( termData ) {

			submitText = 'Edit';

			termNameTile = newTermName;
		}

		this.setState({ termNameTile, submitText, newTermName });
	},

	populateData: function( term ) {

		var termData = this.props.getTermByName( term ),
			newTermDefinition;

		if( termData ) {

			newTermDefinition = termData.definition;
			this.setState({ newTermDefinition });
		}

		
	},

	submitTerm: function(){

		var termData = this.props.getTermByName( this.state.newTermName );

		if( termData ) {
			
			console.log( 'saving edit' );
			EditTerm( termData.id, this.state.newTermName, this.state.newTermDefinition );

		} else {

			console.log( 'creating term' );
			CreateTerm( this.state.newTermName, this.state.newTermDefinition );
		}

	},

	removeTerm: function(){ 

		var termData = this.props.getTermByName( this.state.newTermName );

		RemoveTerm( termData.id, this.state.newTermName );
	},

	render: function(){

		return (
		<div>
			<div>
				<label style={{display:'block'}}>
					Name
					<div>
						<input type="text" value={this.state.newTermName} onChange={this.checkTermName} />
					</div>
				</label>
				<label>
					Definition
					<div>
						<textarea valueLink={this.linkState('newTermDefinition')} />
					</div>
				</label>
				<button onClick={this.submitTerm}>{this.state.submitText}</button>
				{this.state.submitText === 'Edit' ? 
					<button onClick={this.removeTerm}>Remove</button> 
				: '' }
			</div>

			<div>
			{this.state.termNameTile ? 
					<LingoTile term={this.state.termNameTile} onClick={this.populateData} />
				: ''  }
			</div>
		</div>
		);
		// this is the admin tool.
		// 		<LingoSearchContainer terms={this.props.terms} setActive={this.setActive} />
		// 		<LingoTermEditor term={this.state.activeTerm} />
	}
});

export default LingoAdminTool;
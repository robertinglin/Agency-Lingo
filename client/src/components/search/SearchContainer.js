import React from 'react';
import LingoSearchBar from './SearchBar'; 
import LingoAutoComplete from './AutoComplete'; 
import LingoSearchTile from './SearchTile';


var LingoSearchContainer = React.createClass({
	
	onSearchChange: function( event){

		this.setFilterText( event.target.value );
	},

	setFilterText: function( value ) {

		var partials,
			matchingTerms,
			selectedTerm = null;

		[ partials, matchingTerms ] = this.getPartials( value );

		if( partials.length === 1 ) {

			selectedTerm = matchingTerms[ 0 ];

		}

		this.setState( { partials: partials,
						 filterText: value,
						 selectedTerm: selectedTerm } );
	},

	getPartials: function( filterText ){

		if( filterText.replace( /\s/g, '' ) === '' ) {
			return [ [], [] ];
		}

		var searchTerm = filterText.replace(/\s/g, '').toLowerCase(),
			matchingTerms = this.props.terms.filter(function( term ){
				return ~term.Name.toLowerCase().replace(/\s/g, '').indexOf( searchTerm );
			}),
			partials = [],
			len = Math.min( matchingTerms.length, 5 );

		for( var i = 0; i < len; ++i ) {

			// if we have an exact text match use that.
			if( filterText.toLowerCase() === matchingTerms[ i ].Name.toLowerCase() ) {
				partials = [ matchingTerms[ i ].Name ];
				matchingTerms = [matchingTerms[ i ]];
				break;
			} 
			
			partials.push( matchingTerms[ i ].Name );
		}


		return [ partials, matchingTerms ];
	},

	componentWillUpdate: function( props, state ) {

	},

	getInitialState: function(){

		return {

			filterText: '',
			partials: []
		};
	},

	render: function(){

		return (
			<div className="search-container">
				<LingoSearchBar
					filterText={this.state.filterText}
					onChange={this.onSearchChange} />
				<LingoAutoComplete
					autoCompleteOptions={this.state.partials}
					onSelectOption={this.setFilterText} />
				{ this.state.selectedTerm ? <LingoSearchTile term={this.state.selectedTerm} /> : '' }
			</div>
		);
	}
});

export default LingoSearchContainer;
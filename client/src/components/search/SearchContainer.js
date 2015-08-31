import React from 'react';
import LingoSearchBar from './SearchBar'; 
import LingoAutoComplete from './AutoComplete';

var LingoSearchContainer = React.createClass({
	
	onSearchChange: function( event){

		this.setFilterText( event.target.value );
	},

	setFilterText: function( value ) {

		var partials,
			matchingTerms,
			selectedTerm = null;

		partials = this.getPartials( value );

		if( partials.length === 1 ) {

			selectedTerm = partials[ 0 ];
		}
		this.props.setActive( selectedTerm );

		this.setState( { partials: partials,
						 filterText: value,
						 selectedTerm: selectedTerm } );
	},

	getPartials: function( filterText ){

		if( filterText.replace( /\s/g, '' ) === '' ) {
			return [];
		}

		var searchTerm = filterText.replace(/\s/g, '').toLowerCase(),
			matchingTerms = this.props.terms.filter(function( term ){
				return ~term.name.toLowerCase().replace(/\s/g, '').indexOf( searchTerm );
			}),
			partials = [],
			len = Math.min( matchingTerms.length, 5 );

		for( var i = 0; i < len; ++i ) {

			// if we have an exact text match use that.
			if( filterText.toLowerCase() === matchingTerms[ i ].name.toLowerCase() ) {
				partials = [ matchingTerms[ i ].name ];
				
				break;
			} 
			
			partials.push( matchingTerms[ i ].name );
		}


		return partials;
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
			</div>
		);
	}
});

export default LingoSearchContainer;
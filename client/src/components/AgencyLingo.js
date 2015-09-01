import React from 'react';
import LingoNavBar from './NavBar';
import LingoSearchContainer from './search/SearchContainer'; 
import LingoTable from './browse/lingo-home';
import LingoActiveTile from './tile/ActiveTile'; 
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

import termStore from '../stores/TermStore';

var AgencyLingo = React.createClass({
	
	routeClick: function( event ) {

		console.log(event);

		this.setState( { route : event.target.value, activeTerm: null });

	},

	getTerms: function(){
		fetch('data/json/lingo.json')
            .then(res => {
                    if (res.status !== 200) {
                            console.log('Get it together, Nick! Error: ' + res.status);
                            throw new Error('Error fetching');
                    }
                    return res.json();
            })
            .then(data => {

                //setting state terms so that it returns JSON data in terms = []
                for( var i = 0; i < data.length; ++i ) {

                    termStore.dispatch( {type: 'term/create', name: data[ i ].Name, definition: data[ i ].Definition, related: data[ i ].Related });
                }


                termStore.subscribe( () => this.buildTerms() );
                
                this.buildTerms();
            })
            .catch(function(err) {
                    console.log('Fetch Error X_x', err);
            });
	},

    buildTerms: function() {


        var alphabetNameSort = function( a, b ){
            if( a.name < b.name ) {
                return -1;
            } else if( a.name > b.name ) {
                return 1;
            }
            return 0;
        }

        var builtTerms = termStore.getState().toArray().sort( alphabetNameSort );

        this.buildLookupTable( builtTerms );

        this.setState( { terms: builtTerms });
    },

    buildLookupTable: function( terms ) {

        this.termsLookup = {};

        for( var i = 0; i < terms.length; ++i ) {

            this.termsLookup[ terms[ i ].name ] = terms[ i ];
        }
    },

    componentWillMount: function(){

        this.getTerms();
    },

    getInitialState: function(){

        return {
            // terms: [],
            route: 'browse',
            activeTerm: null,
            terms: termStore.getState().toArray()
        }
    },
    componentDidMount: function(){
        if (ExecutionEnvironment.canUseDOM) {
          window.addEventListener('scroll', this.handleScroll);
        }
    },
    componentWillUnmount: function(){
        window.removeEventListener('scroll', this.handleScroll);
        termStore.unsubscribe();
    },
    handleScroll: function(){
        this.setActive();        
    },
	setActive: function( termName ) {

		this.setState( { activeTerm: this.termsLookup[ termName ] || null } );
		if( this.state.route ==='search' ){
			this.top = document.querySelector( '.search-container' ).getBoundingClientRect().bottom + 'px';
		} else {
			this.top = '50%';
		}
	},

	render: function(){

		var classString = this.state.route + ' col-xs-12';
		return (
			<div className={classString}>
				<LingoNavBar onClick={this.routeClick} />
				{(() => {
					switch ( this.state.route ) {
						case 'search' : return ( <LingoSearchContainer terms={this.state.terms} setActive={this.setActive} /> );
						case 'browse' : return ( <LingoTable terms={this.state.terms} setActive={this.setActive}/> );
					}
				})()}
				{ this.state.activeTerm && this.state.route === 'browse' ? 
					<div className="activeCurtain" onClick={this.setActive} /> : '' }
				
				<LingoActiveTile term={this.state.activeTerm} top={this.top} setActive={this.setActive} />
			</div>
		);
	}
});


export default AgencyLingo;
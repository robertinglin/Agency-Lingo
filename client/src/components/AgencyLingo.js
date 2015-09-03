import React from 'react';
import LingoNavBar from './NavBar';
import LingoSearchContainer from './search/SearchContainer'; 
import LingoTable from './browse/lingo-home';
import LingoActiveTile from './tile/ActiveTile'; 
import LingoAdminTools from './admintools/AdminTools';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import {register,getLocation} from 'lucid-router';

import termStore from '../stores/TermStore';

var AgencyLingo = React.createClass({
	
	routeClick: function( event ) {

		this.setState( { route : event.target.value, activeTerm: null });

	},

    buildTerms: function() {


        var alphabetNameSort = function( a, b ){
            if( a.name.toLowerCase() < b.name.toLowerCase() ) {
                return -1;
            }
            return 1;
        }

        var builtTerms = termStore.getState().terms.toArray().sort( alphabetNameSort );

        this.buildLookupTable( builtTerms );

        this.setState( { terms: builtTerms });
    },

    buildLookupTable: function( terms ) {

        this.termsLookup = {};

        for( var i = 0; i < terms.length; ++i ) {

            this.termsLookup[ terms[ i ].name.toLowerCase() ] = terms[ i ];
        }

        console.log( Object.keys( this.termsLookup ).length );
    },

    getTermByName: function( termName ) {

        return this.termsLookup[ termName.toLowerCase() ] || null;

    },
    getInitialState: function(){

        return {
            route: ( getLocation() || {} ).name || 'browse',
            activeTerm: null,
            terms: termStore.getState().terms.toArray()
        }
    },

    componentDidMount: function(){
        register(this.routeChanged);

        termStore.subscribe( () => this.buildTerms() );

        if (ExecutionEnvironment.canUseDOM) {
          window.addEventListener('scroll', this.handleScroll);
        }
    },
    componentWillUnmount: function(){
        window.removeEventListener('scroll', this.handleScroll);
        termStore.unsubscribe();
    },

    routeChanged: function (location){
        console.log(location);
        this.setState({
            route: location.name
        });

    },
    handleScroll: function(){
        this.setActive();     
    },
	setActive: function( termName ) {

        if( typeof termName !== 'string' ) {
            termName = null;
        }

		this.setState( { activeTerm: this.termsLookup[ termName && termName.toLowerCase() ] || null } );
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
                        case 'admin'  : return ( <LingoAdminTools terms={this.state.terms} getTermByName={this.getTermByName} setActive={this.setActive}  /> );
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
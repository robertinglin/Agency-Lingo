import React from 'react';
import LingoNavBar from './NavBar';
import LingoSearchContainer from './search/SearchContainer'; 
import LingoTable from './browse/lingo-home';
import LingoActiveTile from './tile/ActiveTile'; 
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

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
                this.buildLookupTable( data );
                this.setState({ terms: data });
            })
            .catch(function(err) {
                    console.log('Fetch Error X_x', err);
            });
	},

	buildLookupTable: function( terms ) {

		this.termsLookup = {};

		for( var i = 0; i < terms.length; ++i ) {

			this.termsLookup[ terms[ i ].Name ] = terms[ i ];
		}
	},

	componentWillMount: function(){
		
		this.getTerms();
	},

	getInitialState: function(){

		return {
			terms: [],
			route: 'browse',
			activeTerm: null
		}
	},
	componentDidMount: function(){
        if (ExecutionEnvironment.canUseDOM) {
          window.addEventListener('scroll', this.handleScroll);
        }
    },
    componentWillUnmount: function(){
        window.removeEventListener('scroll', this.handleScroll);
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

		return (
			<div className={this.state.route}>
				<LingoNavBar onClick={this.routeClick} />
				{(() => {
					switch ( this.state.route ) {
						case 'search' : return ( <LingoSearchContainer terms={this.state.terms} setActive={this.setActive} /> );
						case 'browse' : return ( <LingoTable terms={this.state.terms} setActive={this.setActive}/> );
					}
				})()}
				{ this.state.activeTerm && this.state.route === 'browse' ? 
					<div className="activeCurtain" onClick={this.setActive} /> : '' }
				
				<LingoActiveTile term={this.state.activeTerm} top={this.top} />
			</div>
		);
	}
});



React.render(<AgencyLingo />, document.getElementById('lingo-container'));
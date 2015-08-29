import React from 'react';
import LingoNavBar from './NavBar';
import LingoSearchContainer from './search/SearchContainer'; 
import LingoTable from './browse/lingo-home';

var AgencyLingo = React.createClass({
	
	routeClick: function( event ) {

		this.setState( { route : event.target.value });
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
                this.setState({ terms: data });
            })
            .catch(function(err) {
                    console.log('Fetch Error X_x', err);
            });
	},

	componentWillMount: function(){
		
		this.getTerms();
	},

	getInitialState: function(){

		return {
			terms: [],
			route: 'search'
		}
	},

	render: function(){

		return (
			<div>
			<LingoNavBar onClick={this.routeClick} />
			{(() => {
				switch ( this.state.route ) {
					case 'search' : return ( <LingoSearchContainer terms={this.state.terms} /> );
					case 'browse' : return ( <LingoTable terms={this.state.terms} /> );
				}
			})()} 
			</div>
		);
	}
});



React.render(<AgencyLingo />, document.getElementById('lingo-container'));
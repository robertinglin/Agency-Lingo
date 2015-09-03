import React from 'react';
import LingoTile from '../tile/Tile';
import {addRoutes,navigatorFor} from 'lucid-router';
 
//table for the whole thing
var LingoTable = React.createClass({

	setActive: function( termName ){

		this.props.setActive( termName )
	},
    //creating table and headers
    render: function() {

        return (
            <div className="container">
            <div id="search" value="search" onClick={navigatorFor('/search')}>Search</div>
                <div className="row">{
                    this.props.terms.map(term => <LingoTile term={term.name} key={term.id} onClick={this.setActive} />)
                }</div>
             </div>
        );

    }
});


export default LingoTable;
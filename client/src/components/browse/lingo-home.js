import React from 'react';

import LingoTile from '../tile/Tile'; 
 
//table for the whole thing
var LingoTable = React.createClass({

	setActive: function( termName ){

		this.props.setActive( termName )
	},
    //creating table and headers
    render: function() {

        return (
            <div className="container">
            
                <div className="row">{
                    this.props.terms.map(term => <LingoTile term={term.name} key={term.id} onClick={this.setActive} />)
                }</div>
             </div>
        );

    }
});


export default LingoTable;
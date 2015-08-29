import React from 'react';

function pastelColors(){
    var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
}

var LingoTile = React.createClass({

        getInitialState: function() {

            return {
                bgColor: pastelColors(),
                active: false,
                onClick: (function(){
                    this.setState( { 'active' : !this.state.active } );
                }).bind( this )
            };
        },
        render: function() {

            var classString = 'tile col-xs-12 col-sm-6 col-md-4';

            return (
                <div onClick={this.props.onClick.bind( null, this.props.term.Name )} 
                	className={classString} 
                	style={{background:this.state.bgColor}}>
                    <div className="centered">{this.props.term.Name}</div>
                </div>
            );
        }
});
 
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
                    this.props.terms.map(term => <LingoTile term={term} key={term.name} onClick={this.setActive} />)
                }</div>
             </div>
        );

    }
});


export default LingoTable;
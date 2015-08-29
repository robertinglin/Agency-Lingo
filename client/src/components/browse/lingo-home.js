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

            var Definition = <div className="definition">{this.props.term.Definition}</div>,
                Note = <div className="note">{this.props.term.Note}</div>;

            return (
                <div onClick={this.state.onClick} className="tile" style={{background:this.state.bgColor}}>
                    <div className="centered">{this.props.term.Name}</div>
                    {this.state.active ? Definition : '' }
                    {this.state.active && this.props.term.Note ? Note : ''}
                </div>
            );
        }
});
 
//table for the whole thing
var LingoTable = React.createClass({

    //creating table and headers
    render: function() {

        return (
            <div className="container">
            
                <div className="container">{
                    this.props.terms.map(term => <LingoTile term={term} key={term.name} />)
                }</div>
             </div>
        );

    }
});


export default LingoTable;
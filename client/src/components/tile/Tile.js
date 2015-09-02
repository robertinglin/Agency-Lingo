import React from 'react';


function pastelColors(){
    var darkFactor = 0.75
    var r = parseInt((Math.round(Math.random()* 127) + 127) * darkFactor ).toString(16);
    var g = parseInt((Math.round(Math.random()* 127) + 127) * darkFactor ).toString(16);
    var b = parseInt((Math.round(Math.random()* 127) + 127) * darkFactor ).toString(16);
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
                <div onClick={this.props.onClick.bind( null, this.props.term )} 
                	className={classString} 
                	style={{background:this.state.bgColor}}>
                    <h2 className="centered">{this.props.term}</h2>
                </div>
            );
        }
});

export default LingoTile;
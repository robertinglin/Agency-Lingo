import React from 'react/addons';
console.log( React );

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;



var LingoActiveTile = React.createClass({
    render: function(){

        return (
            <ReactCSSTransitionGroup transitionName="active-tile" transitionLeave={true}>
                { this.props.term ? (
                    <div key="active-tile" className="active-tile" >
                        <h2>{this.props.term.Name}</h2>
                        <p>{this.props.term.Definition}</p>
                    </div> ) : '' }
            </ReactCSSTransitionGroup>
        );
    }
});

export default LingoActiveTile;
import React from 'react/addons';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var LingoActiveTile = React.createClass({
    setActive: function( event ){
        this.props.setActive();
        var term = event.target.value ;

        // Add a delay to allow for the exit transition
        setTimeout((function(){this.props.setActive( term );}).bind( this ), 250 );
    },
    render: function(){

        return (
            <ReactCSSTransitionGroup transitionName="active-tile" transitionLeave={true}>
                { this.props.term ? (
                    <div key="active-tile" className="active-tile" >
                        <h3>{this.props.term.Name}</h3>
                        <p>{this.props.term.Definition}</p>
                        {this.props.term.Related ? <h4>Related</h4> : ''}
                        {this.props.term.Related && this.props.term.Related.length ?
                            this.props.term.Related.map( 
                                term => <button key={term} value={term} onClick={this.setActive}>{term}</button>
                            )
                            : ''}
                    </div> ) : '' }
            </ReactCSSTransitionGroup>
        );
    }
});

export default LingoActiveTile;
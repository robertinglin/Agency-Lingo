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
                        <h3>{this.props.term.name}</h3>
                        <p>{this.props.term.definition}</p>
                        {this.props.term.related.length ? <h4>Related</h4> : ''}
                        {this.props.term.related.length ?
                            this.props.term.related.map( 
                                term => <button key={term} value={term} onClick={this.setActive}>{term}</button>
                            )
                            : ''}
                    </div> ) : '' }
            </ReactCSSTransitionGroup>
        );
    }
});

export default LingoActiveTile;